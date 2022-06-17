import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { Coach } from 'src/coaches/entities/coach.entity';
import { CreateGroupResponse } from './dto/create-group-response';
import { EditGroupInput } from './dto/edit-group.input';
import { EditGroupResponse } from './dto/edit-group-response';
import { DeleteGroupResponse } from './dto/delete-group-response';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => CreateGroupResponse)
  @Roles(Role.COACH)
  createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<CreateGroupResponse> {
    return this.groupsService.createGroup(createGroupInput);
  }

  @Query(() => [Group])
  @Roles(Role.COACH)
  groups(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @ResolveField(() => Coach)
  coach(@Parent() group: Group): Promise<Coach> {
    return this.groupsService.getCoach(group.coachId);
  }

  @Mutation(() => EditGroupResponse)
  @Roles(Role.COACH)
  editGroup(
    @Args('editGroupInput') editGroupInput: EditGroupInput,
  ): Promise<EditGroupResponse> {
    return this.groupsService.editGroup(editGroupInput);
  }

  @Mutation(() => DeleteGroupResponse)
  @Roles(Role.COACH)
  deleteGroup(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<DeleteGroupResponse> {
    return this.groupsService.deleteGroup(id);
  }
}
