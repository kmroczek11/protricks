import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';
import { CreatePaymentResponse } from './dto/create-payment-response';
import CreatePaymentInput from './dto/create-payment.input';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => CreatePaymentResponse)
  @Roles(Role.TRAINEE)
  createPayment(
    @Args('createPaymentInput') createChargeInput: CreatePaymentInput,
    @CurrentUser() user: User,
  ): Promise<CreatePaymentResponse> {
    return this.paymentsService.charge(
      createChargeInput,
      user.stripeCustomerId,
    );
  }
}
