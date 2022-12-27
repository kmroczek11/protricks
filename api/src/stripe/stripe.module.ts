import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import StripeResolver from './stripe.resolver';
import StripeService from './stripe.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        APP_HOST: Joi.string(),
      }),
    }),
  ],
  providers: [StripeService, StripeResolver],
  exports: [StripeService],
})
export class StripeModule {}
