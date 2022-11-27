import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { Repository } from 'typeorm';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance';

@Injectable()
export class AttendanceListService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceListRepository: Repository<Attendance>,
        private groupsService: GroupsService,
      ) {}
    
      createAttendance(createAttendanceInput: CreateAttendanceInput) {
        const newAttendance = this.attendanceListRepository.create(createAttendanceInput);
    
        return this.attendanceListRepository.save(newAttendance);
      }

      async getTotalPrice(userId:string){
        const attendance = await this.attendanceListRepository.count({where:{userId}})
        const groupPrice = await (await this.groupsService.findOne(userId)).price

        return attendance * groupPrice;
      }
}
