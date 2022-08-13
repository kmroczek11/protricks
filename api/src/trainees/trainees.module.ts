import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { UsersModule } from 'src/users/users.module';
import { Trainee } from './entities/trainee.entity';
import { TraineesResolver } from './trainees.resolver';
import { TraineesService } from './trainees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee]), UsersModule, GroupsModule],
  providers: [TraineesService, TraineesResolver],
})
export class TraineesModule {}
