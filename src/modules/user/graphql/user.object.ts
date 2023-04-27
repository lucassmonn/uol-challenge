import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectBase } from '@shared/base/object.base';
import { PaginatedOutputObject } from '@shared/interfaces/pagination.interface';
import { RoleEnum } from '../enum/role.enum';

@ObjectType()
export class UserObject extends ObjectBase {
  @Field(() => String)
  email: string;

  @Field(() => RoleEnum)
  role: RoleEnum;
}

@ObjectType()
export class PaginatedUser extends PaginatedOutputObject {
  @Field(() => [UserObject])
  data: UserObject[];
}
