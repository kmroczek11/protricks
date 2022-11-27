import { Module } from '@nestjs/common';
import { AttendanceListService } from './attendance-list.service';
import { AttendanceListResolver } from './attendance-list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]),GroupsModule],
  providers: [AttendanceListResolver, AttendanceListService]
})
export class AttendanceListModule {}
