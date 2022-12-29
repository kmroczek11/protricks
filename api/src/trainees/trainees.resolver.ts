import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Group } from 'src/groups/entities/group.entity';
import { MailService } from 'src/mail/mail.service';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';
import { AcceptToGroupResponse } from './dto/accept-to-group-response';
import { AcceptToGroupInput } from './dto/accept-to-group.input';
import { ConfirmContractReceiptResponse } from './dto/confirm-contract-receipt-response';
import { ConfirmContractReceiptInput } from './dto/confirm-contract-receipt.input copy';
import { CreateTraineeResponse } from './dto/create-trainee-response';
import { CreateTraineeInput } from './dto/create-trainee.input';
import { DeleteTraineeResponse } from './dto/delete-trainee-response';
import { DeleteTraineeInput } from './dto/delete-trainee.input';
import { JoinGroupResponse } from './dto/join-group-response';
import { JoinGroupInput } from './dto/join-group.input';
import { Status } from './entities/status.enum';
import { Trainee } from './entities/trainee.entity';
import { TraineesService } from './trainees.service';

@Resolver(() => Trainee)
export class TraineesResolver {
  constructor(
    private traineesService: TraineesService,
    private mailService: MailService,
  ) {}

  @Mutation(() => CreateTraineeResponse)
  @Roles(Role.USER)
  createTrainee(
    @Args('createTraineeInput') createTraineeInput: CreateTraineeInput,
  ): Promise<CreateTraineeResponse> {
    return this.traineesService.createTrainee(createTraineeInput);
  }

  @Mutation(() => DeleteTraineeResponse)
  @Roles(Role.COACH, Role.TRAINEE)
  deleteTrainee(
    @Args('deleteTraineeInput') deleteTraineeInput: DeleteTraineeInput,
  ): Promise<DeleteTraineeResponse> {
    return this.traineesService.deleteTrainee(deleteTraineeInput);
  }

  @Query(() => [Trainee])
  @Roles(Role.COACH)
  trainees(): Promise<Trainee[]> {
    return this.traineesService.findAll();
  }

  @ResolveField(() => User)
  user(@Parent() trainee: Trainee): Promise<User> {
    return this.traineesService.getUser(trainee.userId);
  }

  @ResolveField(() => Group)
  group(@Parent() trainee: Trainee): Promise<Group> {
    return this.traineesService.getGroup(trainee.groupId);
  }

  @Query(() => Trainee)
  @Roles(Role.TRAINEE)
  getTrainee(@Args('id') id: string): Promise<Trainee> {
    return this.traineesService.getTrainee(id);
  }

  @Mutation(() => AcceptToGroupResponse)
  @Roles(Role.COACH)
  async acceptToGroup(
    @Args('acceptToGroupInput') acceptToGroupInput: AcceptToGroupInput,
  ): Promise<AcceptToGroupResponse> {
    await this.mailService.sendStayMessage(acceptToGroupInput.email);

    return this.traineesService.changeStatus(
      acceptToGroupInput.id,
      Status.EXPECTATION,
    );
  }

  @Mutation(() => JoinGroupResponse)
  @Roles(Role.TRAINEE)
  joinGroup(
    @Args('joinGroupInput') joinGroupInput: JoinGroupInput,
  ): Promise<AcceptToGroupResponse> {
    return this.traineesService.changeStatus(
      joinGroupInput.id,
      Status.ACCEPTED_WITHOUT_CONTRACT,
    );
  }

  @Mutation(() => ConfirmContractReceiptResponse)
  @Roles(Role.COACH)
  confirmContractReceipt(
    @Args('confirmContractReceiptInput')
    confirmContractReceiptInput: ConfirmContractReceiptInput,
  ): Promise<ConfirmContractReceiptResponse> {
    return this.traineesService.changeStatus(
      confirmContractReceiptInput.id,
      Status.ACCEPTED,
    );
  }
}
