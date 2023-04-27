import { Field, InputType } from '@nestjs/graphql';
import { PaginationInput } from '@shared/interfaces/pagination.interface';
import { RoleEnum } from '../enum/role.enum';

@InputType()
export class ListUserInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum;

  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput;
}
