import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { TraineesService } from 'src/trainees/trainees.service';
import { Repository } from 'typeorm';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance';
import { AttendanceByDayInput } from './entities/dto/attendance-by-day.input';

@Injectable()
export class AttendanceListService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceListRepository: Repository<Attendance>,
    private traineesService: TraineesService,
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
    return this.traineesService.findOne(traineeId);
  }
}
