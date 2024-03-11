import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesResolver } from './exercises.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { TraineesModule } from 'src/trainees/trainees.module';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), GroupsModule, TraineesModule, PaymentsModule],
  providers: [ExercisesService, ExercisesResolver],
})
export class ExercisesModule { }
