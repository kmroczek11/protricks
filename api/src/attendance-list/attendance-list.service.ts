import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance';

@Injectable()
export class AttendanceListService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceListRepository: Repository<Attendance>
      ) {}
    
      createAttendance(createAttendanceInput: CreateAttendanceInput) {
        const newAttendance = this.attendanceListRepository.create(createAttendanceInput);
    
        return this.attendanceListRepository.save(newAttendance);
      }
}
