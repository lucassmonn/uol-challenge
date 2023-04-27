import { Field, InputType } from '@nestjs/graphql';
import { ContentTypeEnum } from '../enum/type.enum';

@InputType()
export class CreateContentInput {
  @Field(() => ContentTypeEnum)
  type: ContentTypeEnum;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  url: string;
}
