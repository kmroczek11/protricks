import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceListService } from 'src/attendance-list/attendance-list.service';
import { TraineesService } from 'src/trainees/trainees.service';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import CreateChargeInput from './dto/create-charge.input';
import GetMonthlyCostInput from './dto/get-monthly-cost.input';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>
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

  async getMonthlyCost(getMonthlyCostInput: GetMonthlyCostInput) {
    // const attendance = await this.attendanceListService.count({where:{getMonthlyCostInput.traineeId}})
    //     const groupPrice = await (await this.groupsService.findOne(userId)).price

    //     return attendance * groupPrice;

    return {
      amount: 1000,
    };
  }
}
