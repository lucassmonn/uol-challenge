import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/shared/guards/auth.guard';
import { RoleEnum } from '../enum/role.enum';
import { UserObject } from './user.object';

@Resolver(() => UserObject)
export class UserResolver {
  @UseGuards(JwtGuard)
  @Query(() => [UserObject])
  listUsers(): [UserObject] {
    return [
      {
        email: 'admin@test.com',
        role: RoleEnum.admin,
      },
    ];
  }
}
