import { Field, InputType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { ContentTypeEnum } from '../enum/type.enum';

@InputType()
export class UpdateContentInput {
  @Field(() => String, { nullable: false })
  _id: ObjectId;

  @Field(() => ContentTypeEnum, { nullable: true })
  type?: ContentTypeEnum;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  url?: string;
}
