import { UserObject } from '@modules/user/graphql/user.object';
import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectBase } from '@shared/base/object.base';
import { PaginatedOutputObject } from '@shared/interfaces/pagination.interface';
import { Types } from 'mongoose';
import { ContentTypeEnum } from '../enum/type.enum';

@ObjectType()
export class ContentObject extends ObjectBase {
  @Field(() => ContentTypeEnum)
  type: ContentTypeEnum;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  url: string;

  @Field(() => [UserObject], { nullable: true })
  viewedBy: Types.ObjectId[];

  @Field(() => Number)
  views: number;
}

@ObjectType()
export class PaginatedContentObject extends PaginatedOutputObject {
  @Field(() => [ContentObject])
  data: ContentObject[];
}
