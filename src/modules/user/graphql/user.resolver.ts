import { Query, Resolver } from '@nestjs/graphql';
import { RoleEnum } from '../enum/role.enum';
import { UserObject } from './user.object';

@Resolver(() => UserObject)
export class UserResolver {
  @Query(() => [UserObject])
  listUsers(): UserObject {
    return {
      email: 'admin@test.com',
      role: RoleEnum.admin,
    };
  }
}
