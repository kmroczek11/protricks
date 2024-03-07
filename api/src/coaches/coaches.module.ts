import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CoachesResolver } from './coaches.resolver';
import { Coach } from './entities/coach.entity';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coach]), UsersModule, CitiesModule],
  providers: [CoachesService, CoachesResolver],
  exports: [CoachesService],
})
export class CoachesModule {}
