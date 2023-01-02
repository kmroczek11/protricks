import { Module } from '@nestjs/common';
import { WaitingTraineesResolver } from './waiting_trainees.resolver';
import { WaitingTraineesService } from './waiting_trainees.service';

@Module({
  providers: [WaitingTraineesResolver, WaitingTraineesService]
})
export class WaitingTraineesModule {}
