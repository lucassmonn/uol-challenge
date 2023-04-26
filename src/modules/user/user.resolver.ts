import { Query, Resolver } from '@nestjs/graphql';
import { Role } from './role.enum';
import { UserObject } from './user.object';

@Resolver(() => UserObject)
export class UserResolver {
  @Query(() => UserObject)
  user(): UserObject {
    return {
      email: 'admin@test.com',
      role: Role.admin,
    };
  }
}
