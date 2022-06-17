import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CoachesResolver } from './coaches.resolver';
import { Coach } from './entities/coach.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coach]), UsersModule],
  providers: [CoachesService, CoachesResolver],
  exports: [CoachesService],
})
export class CoachesModule {}
