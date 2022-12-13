import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { Role } from './entities/role.enum';
import  { User }  from './entities/user.entity';
import StripeService from '../stripe/stripe.service';
import { string } from 'joi';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private stripeService: StripeService
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const stripeCustomer = await this.stripeService.createCustomer(createUserInput.firstName, createUserInput.email)

    const newUser = await this.usersRepository.create({
      ...createUserInput,
      stripeCustomerId: stripeCustomer.id
    });
    await this.usersRepository.save(newUser);
    return newUser;
  } 


  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string, options?: any): Promise<User> {
    return this.usersRepository.findOne({ where: { email }, ...options });
  }

  findOneById(id: string, options?: any): Promise<User> {
    return this.usersRepository.findOne({ where: { id }, ...options });
  }

  async addRole(id: string, role: Role) {
    const user = await this.usersRepository.findOne({ where: { id } });

    return this.usersRepository.update(id, { roles: [...user.roles, role] });
  }

  async deleteRole(id: string, role: Role) {
    const user = await this.usersRepository.findOne({ where: { id } });

    return this.usersRepository.update(id, {
      roles: user.roles.filter((r) => r !== role),
    });
  }

  async updateById(id: string, data: any) {
    await this.usersRepository.update(id, data);
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateByEmail(email: string, data: any) {
    await this.usersRepository.update({ email }, data);
    return this.usersRepository.findOne({ where: { email } });
  }
}

export default UsersService;