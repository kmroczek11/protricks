import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsModule } from 'src/groups/groups.module';
import { LostTraineesModule } from 'src/lost_trainees/lost_trainees.module';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { Trainee } from './entities/trainee.entity';
import { TraineesResolver } from './trainees.resolver';
import { TraineesService } from './trainees.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trainee]),
    UsersModule,
    GroupsModule,
    MailModule,
    LostTraineesModule
  ],
  providers: [TraineesService, TraineesResolver],
  exports: [TraineesService],
})
export class TraineesModule {}
