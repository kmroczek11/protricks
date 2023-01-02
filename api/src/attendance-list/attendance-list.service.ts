import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { PaymentsService } from 'src/payments/payments.service';
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

    const group = await await this.groupsService.findOne(trainee.groupId);

    const groupPrice = group.price;

    const monthExercisesCount = group.exercises.filter((a) =>
      this.checkIfCurrentMonth(a.day),
    ).length;

    const amount = monthExercisesCount * groupPrice;

    return {
      amount,
    };
  }
}
