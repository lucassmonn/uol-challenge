import { Field, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class DeleteContentInput {
  @Field(() => String, { nullable: false })
  _id: Types.ObjectId;
}
