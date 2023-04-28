import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from '@shared/interfaces/pagination.interface';
import { ContentTypeEnum } from '../enum/type.enum';

@InputType()
export class ListContentInput {
  @Field(() => ContentTypeEnum, { nullable: true })
  type: ContentTypeEnum;

  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput;
}
