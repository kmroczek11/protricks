import { Field, InputType, Int } from '@nestjs/graphql';
import { Upload } from './upload.scalar';

@InputType()
export class ChangeProfilePicInput {
  @Field(() => Int)
  userId: number;

  @Field()
  image: Upload;
}
