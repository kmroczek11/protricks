
import { User } from './users/entities/user.entity';
import { Coach } from './coaches/entities/coach.entity';
import { Trainee } from './trainees/entities/trainee.entity';
import { LostTrainee } from './lost_trainees/entities/lostTrainee.entity';
import { Group } from './groups/entities/group.entity';
import { Exercise } from './exercises/entities/exercise.entity';
import { City } from './cities/entities/city.entity';
import { Attendance } from './attendances/entities/attendance.entity';
import { Payment } from './payments/entities/payment.entity';

export const entities = [
  User,
  Coach,
  Trainee,
  LostTrainee,
  Group,
  Exercise,
  City,
  Attendance,
  Payment,
];
