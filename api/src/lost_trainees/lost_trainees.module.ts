import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LostTrainee } from './entities/lostTrainee.entity';
import { LostTraineesResolver } from './lost_trainees.resolver';
import { LostTraineesService } from './lost_trainees.service';

@Module({
  imports: [TypeOrmModule.forFeature([LostTrainee])],
  providers: [LostTraineesResolver, LostTraineesService],
})
export class LostTraineesModule {}
