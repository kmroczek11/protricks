import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsService } from 'src/payments/payments.service';
import { DataSource, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';

import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly paymentsService: PaymentsService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource
  ) { }

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const encryptedEmailResult = await this.dataSource.query(
      `SELECT pgp_sym_encrypt($1, $2, 'cipher-algo=aes256, compress-algo=0, convert-crlf=0') AS encrypted`,
      [createUserInput.emailPlain, this.configService.get<string>('encryptionKey')],
    );

    if (!encryptedEmailResult?.length || !encryptedEmailResult[0].encrypted) {
      throw new Error('Email encryption failed');
    }

    const stripeCustomer = await this.paymentsService.createCustomer(
      createUserInput.firstName,
      createUserInput.emailPlain,
    );

    const encryptedEmail: Buffer = encryptedEmailResult[0].encrypted;

    const emailHash = crypto
      .createHash('sha256')
      .update(createUserInput.emailPlain.trim().toLowerCase())
      .digest('hex');

    const newUser = this.usersRepository.create({
      ...createUserInput,
      email: encryptedEmail,
      emailHash,
      stripeCustomerId: stripeCustomer.id,
    });

    await this.usersRepository.save(newUser);

    newUser.emailPlain = createUserInput.emailPlain; // Set decrypted field for response

    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string, options?: any): Promise<User> {
    const emailHash = crypto
      .createHash('sha256')
      .update(email.trim().toLowerCase())
      .digest('hex');

    return this.usersRepository.findOne({ where: { emailHash }, ...options });
  }

  async findOneById(id: string, options?: any): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }, ...options });

    if (!user) return null;

    const decryptedEmailResult = await this.dataSource.query(
      `SELECT pgp_sym_decrypt($1::bytea, $2) AS decrypted`,
      [user.email, this.configService.get<string>('encryptionKey')],
    );

    user.emailPlain = decryptedEmailResult[0].decrypted;

    return user;
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
    const emailHash = crypto
      .createHash('sha256')
      .update(email.trim().toLowerCase())
      .digest('hex');

    await this.usersRepository.update({ emailHash }, data);

    return this.usersRepository.findOne({ where: { emailHash } });
  }
}
