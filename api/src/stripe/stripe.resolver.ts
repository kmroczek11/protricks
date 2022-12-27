// import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/users/entities/role.enum';
import { CreateChargeInput } from './dto/create-charge.dto';
import { CreateChargeResponse } from './dto/create-charge-response';
import { Public } from 'src/auth/decorators/public.decorator';

@Resolver()
export default class StripeResolver {
  constructor(private readonly stripeService: StripeService) {}

  @Mutation(() => CreateChargeResponse)
  @Roles(Role.USER)
  @Public()
  createCharge(
    @Args('createChargeInput') createChargeInput: CreateChargeInput,
    @Context() context,
  ) {
    return this.stripeService.charge(
      createChargeInput.amount,
      createChargeInput.paymentMethodId,
      context.user.stripeCustomerId,
    );
  }
}
