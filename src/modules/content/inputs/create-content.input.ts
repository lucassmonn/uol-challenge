import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsString, IsUrl } from 'class-validator';
import { ContentTypeEnum } from '../enum/type.enum';

@InputType()
export class CreateContentInput {
  @IsEnum(ContentTypeEnum)
  @Field(() => ContentTypeEnum)
  type: ContentTypeEnum;

  @IsString()
  @Field(() => String)
  title: string;

  @IsString()
  @Field(() => String)
  description: string;

  @IsUrl()
  @Field(() => String)
  url: string;
}
