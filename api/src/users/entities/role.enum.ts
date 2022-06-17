import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  USER = 'USER',
  TRAINEE = 'TRAINEE',
  COACH = 'COACH',
  ADMIN = 'ADMIN',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});
