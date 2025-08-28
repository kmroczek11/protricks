import { Module } from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AttendancesResolver } from './attendances.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
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
  providers: [AttendancesResolver, AttendancesService],
})
export class AttendancesModule {}
