import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@ObjectType({ isAbstract: true })
export abstract class ObjectBase {
  @Field(() => String)
  _id: ObjectId;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
