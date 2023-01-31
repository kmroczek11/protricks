import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceListService } from 'src/attendance-list/attendance-list.service';
import { GroupsService } from 'src/groups/groups.service';
import { TraineesService } from 'src/trainees/trainees.service';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { CreatePaymentIntentInput } from './dto/create-payment-intent.input';
import { CreatePaymentItemResponse } from './dto/create-payment-item-response';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async findOneByMonth(month: string) {
    return this.paymentsRepository.findOne({ where: { month } });
  }

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  async createPaymentItem(
    createPaymentItemInput,
    customerId: string,
  ): Promise<CreatePaymentItemResponse> {
    const { amount } = createPaymentItemInput;

    const months = [
      'styczeń',
      'luty',
      'marzec',
      'kwiecień',
      'maj',
      'czerwiec',
      'lipiec',
      'sierpień',
      'wrzesień',
      'październik',
      'listopad',
      'grudzień',
    ];

    const d = new Date();

    const month = months[d.getMonth()];

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

  async createPaymentIntent(
    createPaymentIntentInput: CreatePaymentIntentInput
  ) {
    const { amount } = createPaymentIntentInput;

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: process.env.STRIPE_CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  }
}
