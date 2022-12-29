import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';
import { CreateChargeResponse } from './dto/create-charge-response';
import CreateChargeInput from './dto/create-charge.input';
import { GetMonthlyCostResponse } from './dto/get-monthly-cost-response';
import GetMonthlyCostInput from './dto/get-monthly-cost.input';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}
  
  @Mutation(() => CreateChargeResponse)
  @Roles(Role.USER)
  createCharge(
    @Args('createChargeInput') createChargeInput: CreateChargeInput,
    @CurrentUser() user: User
  ): Promise<CreateChargeResponse> {
    return this.paymentsService.charge(createChargeInput, user.stripeCustomerId);
  }

  @Query(() => GetMonthlyCostResponse)
  // @Roles(Role.USER)
  getMonthlyCost(
    @Args('getMonthlyCostInput') getMonthlyCostInput: GetMonthlyCostInput
  ): Promise<GetMonthlyCostResponse> {
    return this.paymentsService.getMonthlyCost(getMonthlyCostInput);
  }
}
