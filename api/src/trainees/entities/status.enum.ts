import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  FIRST_TIME = 'FIRST_TIME',
  EXPECTATION = 'EXPECTATION',
  ACCEPTED_WITHOUT_CONTRACT = 'ACCEPTED_WITHOUT_CONTRACT',
  ACCEPTED = 'ACCEPTED',
}

registerEnumType(Status, {
  name: 'Status',
  description: 'Trainee status',
});
