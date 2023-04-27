import { UserObject } from '@modules/user/graphql/user.object';
import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectBase } from '@shared/base/object.base';
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

  @Field(() => [UserObject])
  viewedBy?: UserObject[];

  @Field(() => Number)
  views?: number;
}
