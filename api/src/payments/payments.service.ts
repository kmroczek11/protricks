import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import CreateChargeInput from './dto/create-payment.input';
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

  public async createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  async charge(createChargeInput: CreateChargeInput, customerId: string) {
    const { amount, paymentMethodId } = createChargeInput;

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

    await this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: process.env.STRIPE_CURRENCY,
      confirm: true,
    });

    return {
      msg: 'Success',
    };
  }

  async findOneByMonth(month: string) {
    return this.paymentsRepository.findOne({ where: { month } });
  }
}
