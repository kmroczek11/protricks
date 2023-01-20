import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { Exercise } from './entities/exercise.entity';
import { EditExerciseInput } from './dto/edit-exercise.input';
import { TraineesService } from 'src/trainees/trainees.service';
import GetMonthlyExercisesInput from './dto/get-monthly-exercises.input';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    private groupsService: GroupsService,
    private traineesService: TraineesService,
  ) {}

  async createExercise(createExerciseInput: CreateExerciseInput) {
    const newExercise = this.exercisesRepository.create(createExerciseInput);

    this.exercisesRepository.save(newExercise);

    return { msg: 'success' };
  }

  findAll() {
    return this.exercisesRepository.find();
  }

  getGroup(groupId: string): Promise<Group> {
    return this.groupsService.findOne(groupId);
  }

  async editExercise(editExerciseInput: EditExerciseInput) {
    const { exerciseId, ...payload } = editExerciseInput;

    this.exercisesRepository.update(exerciseId, payload);

    return {
      msg: 'success',
    };
  }

  async deleteExercise(id: string) {
    this.exercisesRepository.delete(id);

    return {
      msg: 'success',
    };
  }
}
