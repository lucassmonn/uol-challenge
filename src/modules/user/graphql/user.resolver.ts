import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AdminGuard } from '@shared/guards/admin.guard';
import { JwtGuard } from '@shared/guards/auth.guard';
import { RoleEnum } from '../enum/role.enum';
import { UserObject } from './user.object';

@Resolver(() => UserObject)
export class UserResolver {
  @UseGuards(JwtGuard, AdminGuard)
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
