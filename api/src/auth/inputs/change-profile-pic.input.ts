import { Field, InputType } from '@nestjs/graphql';
import { Upload } from '../helpers/upload.scalar';

@InputType()
export class ChangeProfilePicInput {
  @Field()
  userId: string;

  @Field()
  image: Upload;
}
