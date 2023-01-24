import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/mail.module';
import { LostTrainee } from './entities/lostTrainee.entity';
import { LostTraineesResolver } from './lost_trainees.resolver';
import { LostTraineesService } from './lost_trainees.service';

@Module({
  imports: [TypeOrmModule.forFeature([LostTrainee]), MailModule],
  providers: [LostTraineesResolver, LostTraineesService],
  exports: [LostTraineesService],
})
export class LostTraineesModule {}
