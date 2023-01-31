import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Role } from 'src/users/entities/role.enum';
import { User } from 'src/users/entities/user.entity';
import { CreatePaymentIntentResponse } from './dto/create-payment-intent-response';
import { CreatePaymentIntentInput } from './dto/create-payment-intent.input';
import { CreatePaymentItemResponse } from './dto/create-payment-item-response';
import { CreatePaymentItemInput } from './dto/create-payment-item.input';
import { PaymentsService } from './payments.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Mutation(() => CreatePaymentItemResponse)
  @Roles(Role.TRAINEE)
  createPaymentItem(
    @Args('createPaymentIntentInput')
    createPaymentItemInput: CreatePaymentItemInput,
    @CurrentUser() user: User,
  ): Promise<CreatePaymentItemResponse> {
    return this.paymentsService.createPaymentItem(
      createPaymentItemInput,
      user.stripeCustomerId,
    );
  }

  @Mutation(() => CreatePaymentIntentResponse)
  @Roles(Role.TRAINEE)
  createPaymentIntent(
    @Args('createPaymentIntentInput')
    createPaymentIntentInput: CreatePaymentIntentInput,
  ): Promise<CreatePaymentIntentResponse> {
    return this.paymentsService.createPaymentIntent(createPaymentIntentInput);
  }
}
