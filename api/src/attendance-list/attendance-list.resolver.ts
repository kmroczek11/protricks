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
import { Trainee } from 'src/trainees/entities/trainee.entity';
import { Role } from 'src/users/entities/role.enum';
import { AttendanceListService } from './attendance-list.service';
import { AttendanceByDayInput } from './dto/attendance-by-day.input';
import { CreateAttendanceResponse } from './dto/create-attendance-response.ts';
import { CreateAttendanceInput } from './dto/create-attendance.input';
import { GetMonthlyCostResponse } from './dto/get-monthly-cost-response';
import GetMonthlyCostInput from './dto/get-monthly-cost.input';
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

  @Query(() => [Attendance])
  // @Roles(Role.COACH)
  @Public()
  getAttendanceByDay(
    @Args('attendanceByDayInput') attendanceByDayInput: AttendanceByDayInput,
  ): Promise<Attendance[]> {
    return this.attendanceListService.findAllByDay(attendanceByDayInput);
  }

  @ResolveField(() => Attendance)
  trainee(@Parent() attendance: Attendance): Promise<Trainee> {
    return this.attendanceListService.getTrainee(attendance.traineeId);
  }
  
  @Query(() => GetMonthlyCostResponse)
  @Roles(Role.USER)
  getMonthlyCost(
    @Args('getMonthlyCostInput') getMonthlyCostInput: GetMonthlyCostInput,
  ) {
    return this.attendanceListService.getMonthlyCost(getMonthlyCostInput);
  }
}
