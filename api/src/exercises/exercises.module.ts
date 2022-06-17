import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesResolver } from './exercises.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), GroupsModule],
  providers: [ExercisesService, ExercisesResolver],
})
export class ExercisesModule {}
