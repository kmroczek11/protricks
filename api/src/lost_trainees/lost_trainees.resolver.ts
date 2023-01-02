import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { CreateLostTraineeResponse } from './dto/create-lost-trainee-response';
import { CreateLostTraineeInput } from './dto/create-lost-trainee.input';
import { LostTrainee } from './entities/lostTrainee.entity';
import { LostTraineesService } from './lost_trainees.service';

@Resolver(() => LostTrainee)
export class LostTraineesResolver {
  constructor(private readonly lostTraineesService: LostTraineesService) {}

  @Mutation(() => CreateLostTraineeResponse)
  @Roles(Role.USER)
  createLostTrainee(
    @Args('createLostTraineeInput') createLostTraineeInput: CreateLostTraineeInput,
  ): Promise<CreateLostTraineeResponse> {
    return this.lostTraineesService.createLostTrainee(createLostTraineeInput);
  }
}