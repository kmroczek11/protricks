import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'fs';
import { Repository } from 'typeorm';
import { ChangeProfilePicInput } from './dto/change-profile-pic.input';
import { CreateUserInput } from './dto/create-user.input';
import { Role } from './entities/role.enum';
import { User } from './entities/user.entity';
import { ChangeProfilePicResponse } from './dto/change-profile-pic-response';
import { JwtService } from '@nestjs/jwt';
import { FileUpload } from 'graphql-upload';
import { HttpException, HttpStatus } from '@nestjs/common';
import { join } from 'path';
import { removeFile, saveImage } from './helpers/image-storage';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  createUser(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(createUserInput);

    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string, options?: any): Promise<User> {
    return this.usersRepository.findOne({ email }, options);
  }

  findOneById(id: number, options?: any): Promise<User> {
    return this.usersRepository.findOne(id, options);
  }

  async addRole(id: number, role: Role) {
    const user = await this.usersRepository.findOne(id);

    return this.usersRepository.update(id, { roles: [...user.roles, role] });
  }

  update(id: number, data: any) {
    this.usersRepository.update(id, data);
  }

  async changeProfilePic(changeProfilePicInput: ChangeProfilePicInput) {
    const { userId, image } = changeProfilePicInput;

    const imageData: FileUpload = await image;

    if (!imageData) {
      throw new HttpException(
        'No file provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersRepository.findOne(userId);

    if (user.imgSrc) {
      await removeFile(user.imgSrc);
    }

    const filePath = await saveImage(imageData, 'users');

    await this.update(userId, { imgSrc: filePath });

    const { password, ...payload } = user;

    return {
      token: this.jwtService.sign({ user: payload }),
      user: payload,
    };
  }
}
