import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { CreatePaymentIntentInput } from './dto/create-payment-intent.input';
import { CreatePaymentItemResponse } from './dto/create-payment-item-response';
import { Payment } from './entities/payment.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
    private readonly configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('stripeSecretKey')

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    });
  }

  async findOneByMonthAndCustomerId(month: string, customerId: string) {
    return this.paymentsRepository.findOne({ where: { customerId, month } });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  async createPaymentIntent(
    createPaymentIntentInput: CreatePaymentIntentInput
  ) {
    const { amount } = createPaymentIntentInput;
    const stripeCurrency = this.configService.get<string>('stripeCurrency')

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: stripeCurrency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }

  async createPaymentItem(
    createPaymentItemInput,
    customerId: string,
  ): Promise<CreatePaymentItemResponse> {
    const { month, amount } = createPaymentItemInput;

    const createPaymentInput = {
      customerId,
      amount,
      month,
    };

    const newPayment = await this.paymentsRepository.create(createPaymentInput);

    await this.paymentsRepository.save(newPayment);

    return {
      msg: 'Success',
    };
  }
}
