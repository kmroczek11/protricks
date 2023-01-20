import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { PaymentsService } from 'src/payments/payments.service';
import { Status } from 'src/trainees/entities/status.enum';
import { TraineesService } from 'src/trainees/trainees.service';
import { Repository } from 'typeorm';
import { AttendanceByDayInput } from './dto/attendance-by-day.input';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import GetMonthlyCostInput from './dto/get-monthly-cost.input';
import { Attendance } from './entities/attendance';

@Injectable()
export class AttendanceListService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceListRepository: Repository<Attendance>,
    private paymentsService: PaymentsService,

    private traineesService: TraineesService,
    private groupsService: GroupsService,
  ) {}

  async createAttendance(createAttendanceInput: CreateAttendanceInput) {
    const newAttendance = this.attendanceListRepository.create(
      createAttendanceInput,
    );

    await this.attendanceListRepository.save(newAttendance);

    return {
      msg: 'Success',
    };
  }

  findAllByDay(attendanceByDayInput: AttendanceByDayInput) {
    return this.attendanceListRepository.find({
      where: { day: attendanceByDayInput.day },
    });
  }

  getTrainee(traineeId: string) {
    return this.traineesService.findOneByTraineeId(traineeId);
  }

  checkIfCurrentMonth(day: string) {
    const now = new Date();
    const check = new Date(day);

    if (
      check.getFullYear() == now.getFullYear() &&
      check.getMonth() == now.getMonth()
    )
      return true;
  }

  isRelevant(dateJoined: string, exercisesDay: string) {
    return new Date(dateJoined) <= new Date(exercisesDay);
  }

  isFirstTimeDiscountApplied(firstTimeDate: string, currentFirstTime: string) {
    return (
      new Date(firstTimeDate).getMonth() ===
      new Date(currentFirstTime).getMonth()
    );
  }

  async getMonthlyCost(getMonthlyCostInput: GetMonthlyCostInput) {
    const months = [
      'styczeń',
      'luty',
      'marzec',
      'kwiecień',
      'maj',
      'czerwiec',
      'lipiec',
      'sierpień',
      'wrzesień',
      'październik',
      'listopad',
      'grudzień',
    ];

    const d = new Date();

    const month = months[d.getMonth()];

    const payed = await this.paymentsService.findOneByMonth(month);

    if (payed) return { amount: 0 };

    const trainee = await this.traineesService.findOneByUserId(
      getMonthlyCostInput.userId,
    );

    const group = await this.groupsService.findOne(trainee.groupId);

    const groupPrice = group.price;

    const currentMonthExercises = group.exercises.filter((g) =>
      this.checkIfCurrentMonth(g.day),
    );

    const actualExercises = currentMonthExercises.filter((m) =>
      this.isRelevant(trainee.dateJoined, m.day),
    );

    let actualExercisesCount = actualExercises.length;

    const lastExercise = actualExercises[actualExercisesCount - 1];

    const firstTimeDiscountApplied = this.isFirstTimeDiscountApplied(
      lastExercise.day,
      trainee.dateJoined,
    );

    if (firstTimeDiscountApplied) actualExercisesCount -= 1;

    const amount = actualExercisesCount * groupPrice;

    return {
      actualExercises,
      amount,
      groupPrice,
      firstTimeDiscountApplied,
    };
  }
}
