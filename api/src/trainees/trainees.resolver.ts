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
import { ChangeGroupResponse } from './dto/change-group-response';
import { ChangeGroupInput } from './dto/change-group.input';
import { ConfirmContractReceiptResponse } from './dto/confirm-contract-receipt-response';
import { ConfirmContractReceiptInput } from './dto/confirm-contract-receipt.input';
import { CreateTraineeResponse } from './dto/create-trainee-response';
import { CreateTraineeInput } from './dto/create-trainee.input';
import { DeleteTraineeResponse } from './dto/delete-trainee-response';
import { DeleteTraineeWithMessageResponse } from './dto/delete-trainee-with-message-response';
import { DeleteTraineeWithMessageInput } from './dto/delete-trainee-with-message.input';
import { DeleteTraineeInput } from './dto/delete-trainee.input';
import { JoinGroupResponse } from './dto/join-group-response';
import { JoinGroupInput } from './dto/join-group.input';
import { Status } from './entities/status.enum';
import { Trainee } from './entities/trainee.entity';
import { TraineesService } from './trainees.service';

@Resolver(() => Trainee)
export class TraineesResolver {
  constructor(
    private traineesService: TraineesService
  ) {}

  @Mutation(() => CreateTraineeResponse)
  @Roles(Role.USER)
  createTrainee(
    @Args('createTraineeInput') createTraineeInput: CreateTraineeInput,
  ): Promise<CreateTraineeResponse> {
    return this.traineesService.createTrainee(createTraineeInput);
  }

  @Mutation(() => DeleteTraineeResponse)
  @Roles(Role.COACH)
  deleteTrainee(
    @Args('deleteTraineeInput') deleteTraineeInput: DeleteTraineeInput,
  ): Promise<DeleteTraineeResponse> {
    return this.traineesService.deleteTrainee(deleteTraineeInput);
  }

  @Mutation(() => DeleteTraineeWithMessageResponse)
  @Roles(Role.TRAINEE)
  deleteTraineeWithMessage(
    @Args('deleteTraineeWithMessageInput') deleteTraineeWithMessageInput: DeleteTraineeWithMessageInput,
  ): Promise<DeleteTraineeWithMessageResponse> {
    return this.traineesService.deleteTraineeWithMessage(deleteTraineeWithMessageInput);
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
  acceptToGroup(
    @Args('acceptToGroupInput') acceptToGroupInput: AcceptToGroupInput,
  ): Promise<AcceptToGroupResponse> {
    return this.traineesService.acceptToGroup(acceptToGroupInput)
  }

  @Mutation(() => JoinGroupResponse)
  @Roles(Role.TRAINEE)
  joinGroup(
    @Args('joinGroupInput') joinGroupInput: JoinGroupInput,
  ): Promise<AcceptToGroupResponse> {
    return this.traineesService.joinGroup(joinGroupInput)
  }

  @Mutation(() => ConfirmContractReceiptResponse)
  @Roles(Role.COACH)
  confirmContractReceipt(
    @Args('confirmContractReceiptInput')
    confirmContractReceiptInput: ConfirmContractReceiptInput,
  ): Promise<ConfirmContractReceiptResponse> {
    return this.traineesService.confirmContractReceipt(confirmContractReceiptInput)
  }

  @Mutation(() => ChangeGroupResponse)
  @Roles(Role.COACH)
  changeGroup(
    @Args('changeGroupInput') changeGroupInput: ChangeGroupInput,
  ): Promise<ChangeGroupResponse> {
    return this.traineesService.changeGroup(changeGroupInput);
  }
}
