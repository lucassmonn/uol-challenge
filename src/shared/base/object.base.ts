import { Field } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

export class ObjectBase {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
