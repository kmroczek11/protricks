import { Module } from '@nestjs/common';
import { AttendanceListService } from './attendance-list.service';
import { AttendanceListResolver } from './attendance-list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  providers: [AttendanceListResolver, AttendanceListService]
})
export class AttendanceListModule {}
