import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { AttendanceListService } from './attendance-list.service';
import { CreateAttendanceResponse } from './dto/create-attendance-response.ts';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance';

@Resolver(() => Attendance)
export class AttendanceListResolver {
  constructor(private readonly attendanceListService: AttendanceListService) {}

  @Mutation(() => CreateAttendanceResponse)
  @Roles(Role.COACH)
  createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  ): Promise<CreateAttendanceResponse> {
    return this.attendanceListService.createAttendance(createAttendanceInput);
  }

  @Query(() => Number)
  @Roles(Role.TRAINEE)
  getTotalPrice(@Args('userId') userId: string): Promise<Number> {
    return this.attendanceListService.getTotalPrice(userId);
  }
}
