import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { PaymentsService } from 'src/payments/payments.service';
import { TraineesService } from 'src/trainees/trainees.service';
import { Repository } from 'typeorm';
import { AttendanceByGroupIdAndDayInput } from './dto/attendance-by-group-id-and-day.input';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendancesRepository: Repository<Attendance>,
    private groupsService: GroupsService,
    private traineesService: TraineesService
  ) { }

  async createAttendance(createAttendanceInput: CreateAttendanceInput) {
    const newAttendance = this.attendancesRepository.create(
      createAttendanceInput,
    );

    await this.attendancesRepository.save(newAttendance);

    return {
      msg: 'Success',
    };
  }

  findAllByGroupIdAndDay(attendanceByGroupIdAndDayInput: AttendanceByGroupIdAndDayInput) {
    const { groupId, day } = attendanceByGroupIdAndDayInput;

    return this.attendancesRepository.find({
      where: { groupId, day },
    });
  }

  getGroup(groupId: string) {
    return this.groupsService.findOne(groupId);
  }

  getTrainee(traineeId: string) {
    return this.traineesService.findOne(traineeId);
  }

  async findAllByUserId(id: string) {
    const trainee = await this.traineesService.findOneByUserId(id)
    const traineeId = trainee.id

    return this.attendancesRepository.find({
      where: { traineeId },
    });
  }
}
