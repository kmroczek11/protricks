import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { TraineesService } from 'src/trainees/trainees.service';
import { Repository } from 'typeorm';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance';

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

  findAll() {
    return this.attendanceListRepository.find();
  }

  getTrainee(traineeId: string) {
    return this.traineesService.findOne(traineeId);
  }
}
