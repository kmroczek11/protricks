import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { PaymentsService } from 'src/payments/payments.service';
import { TraineesService } from 'src/trainees/trainees.service';
import { Repository } from 'typeorm';
import { AttendanceByDayInput } from './dto/attendance-by-day.input';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance';

@Injectable()
export class AttendanceListService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceListRepository: Repository<Attendance>,
    private traineesService: TraineesService,
    private groupsService: GroupsService,
    private paymentsService: PaymentsService,
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
}
