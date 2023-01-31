import { Module } from '@nestjs/common';
import { AttendanceListService } from './attendance-list.service';
import { AttendanceListResolver } from './attendance-list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance';
import { TraineesModule } from 'src/trainees/trainees.module';
import { GroupsModule } from 'src/groups/groups.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance]),
    TraineesModule,
    GroupsModule,
    PaymentsModule,
  ],
  providers: [AttendanceListResolver, AttendanceListService],
})
export class AttendanceListModule {}
