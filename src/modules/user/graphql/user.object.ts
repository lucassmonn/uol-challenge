import { Field, ObjectType } from '@nestjs/graphql';
import { RoleEnum } from '../enum/role.enum';

@ObjectType()
export class UserObject {
  @Field(() => String)
  email: string;

  @Field(() => RoleEnum)
  role: RoleEnum;
}
