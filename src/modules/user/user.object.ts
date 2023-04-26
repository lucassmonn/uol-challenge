import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from './role.enum';

@ObjectType()
export class UserObject {
  @Field(() => String)
  email: string;

  @Field(() => Role)
  role: Role;
}
