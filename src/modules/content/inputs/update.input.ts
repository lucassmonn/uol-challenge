import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsUrl } from 'class-validator';
import { Types } from 'mongoose';
import { ContentTypeEnum } from '../enum/type.enum';

@InputType()
export class UpdateContentInput {
  @Field(() => String, { nullable: false })
  _id: Types.ObjectId;

  @IsOptional()
  @IsEnum(ContentTypeEnum)
  @Field(() => ContentTypeEnum, { nullable: true })
  type?: ContentTypeEnum;

  @IsOptional()
  @Field(() => String, { nullable: true })
  title?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  url?: string;
}
