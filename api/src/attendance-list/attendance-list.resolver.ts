import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';
import { AttendanceListService } from './attendance-list.service';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { Attendance } from './entities/attendance';

@Resolver(() => Attendance)
export class AttendanceListResolver {
  constructor(private readonly attendanceListService: AttendanceListService) {}

  @Mutation(() => Attendance)
  @Roles(Role.COACH)
  createAttendance(
    @Args('createAttendanceInput') createAttendanceInput: CreateAttendanceInput,
  ): Promise<Attendance> {
    return this.attendanceListService.createAttendance(createAttendanceInput);
  }

  @Query(() => Number)
  @Roles(Role.TRAINEE)
  getTotalPrice(@Args('userId') userId: string): Promise<Number> {
    return this.attendanceListService.getTotalPrice(userId);
  }
}
