import { Module } from '@nestjs/common';
import { AttendanceListService } from './attendance-list.service';
import { AttendanceListResolver } from './attendance-list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance';
import { GroupsModule } from 'src/groups/groups.module';
import { TraineesModule } from 'src/trainees/trainees.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    GroupsModule,
    TraineesModule,
    PaymentsModule
  ],
  providers: [AttendanceListResolver, AttendanceListService],
})
export class AttendanceListModule {}
