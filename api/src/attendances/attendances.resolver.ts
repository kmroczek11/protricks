import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Group } from 'src/groups/entities/group.entity';
import { Trainee } from 'src/trainees/entities/trainee.entity';
import { Role } from 'src/users/entities/role.enum';
import { AttendancesService } from './attendances.service';
import { AttendanceByGroupIdAndDayInput } from './dto/attendance-by-group-id-and-day.input';
import { CreateAttendanceResponse } from './dto/create-attendance-response.ts';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance.entity';

@Resolver(() => Attendance)
export class AttendancesResolver {
  constructor(private readonly attendancesService: AttendancesService) { }

  @Mutation(() => CreateAttendanceResponse)
  @Roles(Role.COACH)
  createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  ): Promise<CreateAttendanceResponse> {
    return this.attendancesService.createAttendance(createAttendanceInput);
  }

  @Query(() => [Attendance])
  @Roles(Role.COACH)
  getAttendanceByGroupIdAndDay(
    @Args('attendanceByGroupIdAndDayInput') attendanceByGroupIdAndDayInput: AttendanceByGroupIdAndDayInput,
  ): Promise<Attendance[]> {
    return this.attendancesService.findAllByGroupIdAndDay(attendanceByGroupIdAndDayInput);
  }

  @ResolveField(() => Attendance)
  group(@Parent() attendance: Attendance): Promise<Group> {
    return this.attendancesService.getGroup(attendance.groupId);
  }

  @ResolveField(() => Attendance)
  trainee(@Parent() attendance: Attendance): Promise<Trainee> {
    return this.attendancesService.getTrainee(attendance.traineeId);
  }

  @Query(() => [Attendance])
  @Roles(Role.TRAINEE)
  getAttendanceByUserId(@Args('id') id: string): Promise<Attendance[]> {
    return this.attendancesService.findAllByUserId(id)
  }
}
