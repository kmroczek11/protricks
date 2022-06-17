import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesResolver } from './cities.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { CoachesModule } from 'src/coaches/coaches.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]), CoachesModule],
  providers: [CitiesService, CitiesResolver]
})
export class CitiesModule {}
