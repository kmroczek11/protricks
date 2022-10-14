import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
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
