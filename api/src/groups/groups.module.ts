import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { CoachesModule } from 'src/coaches/coaches.module';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    UsersModule,
    CoachesModule,
    MailModule,
  ],
  providers: [GroupsResolver, GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
