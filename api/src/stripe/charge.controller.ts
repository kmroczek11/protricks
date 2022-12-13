import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Query } from '@nestjs/graphql';
import { Role } from 'src/users/entities/role.enum';
import { CreateChargeInput } from './dto/create-charge.dto';
import { CreateChargeResponse } from './dto/create-charge-response';
 
@Controller('charge')
export default class ChargeController {
  constructor(
    private readonly stripeService: StripeService
  ) {}
 
  @Query(() => CreateChargeResponse)
  @Roles(Role.USER)
  async createCharge( chargeInput: CreateChargeInput, @CurrentUser() user: User) {
    await this.stripeService.charge(chargeInput.amount, chargeInput.paymentMethodId, user.stripeCustomerId);
  }
}