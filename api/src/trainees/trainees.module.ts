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
<<<<<<< HEAD
    LostTraineesModule,
=======
    LostTraineesModule
>>>>>>> 829d47d5d56c9a46b549d8ccf4d606974ffa2d63
  ],
  providers: [TraineesService, TraineesResolver],
  exports: [TraineesService],
})
export class TraineesModule {}
