import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { ResolverBase } from '@shared/base/resolver.base';
import { AdminGuard } from '@shared/guards/admin.guard';
import { JwtGuard } from '@shared/guards/auth.guard';
import { ListUsersUseCase } from '../usecases/list.usecase';
import { UserObject } from './user.object';

@Resolver(() => UserObject)
export class UserResolver extends ResolverBase {
  constructor(private readonly listUsers: ListUsersUseCase) {
    super();
  }
  @UseGuards(JwtGuard, AdminGuard)
  @Query(() => [UserObject])
  async users(): Promise<[UserObject]> {
    return await this.callUseCase(this.listUsers, {});
  }
}
