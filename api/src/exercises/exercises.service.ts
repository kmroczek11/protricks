import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Repository } from 'typeorm';
import { GroupsService } from 'src/groups/groups.service';
import { CreateExerciseInput } from './dto/create-exercise.input';
import { Exercise } from './entities/exercise.entity';
import { EditExerciseInput } from './dto/edit-exercise.input';
import { GetMonthlyExercisesInput } from './dto/get-monthly-exercises.input';
import { TraineesService } from 'src/trainees/trainees.service';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exercisesRepository: Repository<Exercise>,
    private groupsService: GroupsService,
    private traineesService: TraineesService,
    private paymentsService: PaymentsService
  ) { }

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

  async getMonthlyExercises(getMonthlyExercisesInput: GetMonthlyExercisesInput, customerId: string,) {
    const { userId } = getMonthlyExercisesInput;

    const trainee = await this.traineesService.findOneByUserId(userId);

    const group = await this.groupsService.findOne(trainee.groupId);

    const exercises = await this.exercisesRepository.find({ where: { groupId: group.id } })

    const price = group.price

    const months = [
      'styczeń',
      'luty',
      'marzec',
      'kwiecień',
      'maj',
      'czerwiec',
      'lipiec',
      'sierpień',
      'wrzesień',
      'październik',
      'listopad',
      'grudzień',
    ];

    const monthObjects = await Promise.all(months.map(async (m) => {
      const payment = await this.paymentsService.findOneByMonthAndCustomerId(m, customerId)
      const payed = payment != null ? true : false

      return ({
        month: m,
        exercises: [],
        payed
      })
    }))

    exercises.forEach((e) => {
      const mo = monthObjects.find((m) => m.month === months[new Date(e.day).getMonth()])

      mo.exercises.push(e)
    })

    return { monthObjects, price }
  }
}
