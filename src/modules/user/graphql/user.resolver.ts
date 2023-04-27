import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ResolverBase } from '@shared/base/resolver.base';
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { AdminGuard } from '@shared/guards/admin.guard';
import { JwtGuard } from '@shared/guards/auth.guard';
import { FilterQuery } from 'mongoose';
import { ListUserInput } from '../inputs/list-user.input';
import { FindOneUserUseCase } from '../usecases/find-one.usecase';
import { ListUsersUseCase } from '../usecases/list.usecase';
import { UserEntity } from '../user.entity';
import { PaginatedUser, UserObject } from './user.object';

@Resolver(() => UserObject)
export class UserResolver extends ResolverBase {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly findOneUser: FindOneUserUseCase,
  ) {
    super();
  }

  @UseGuards(JwtGuard)
  @Query(() => UserObject)
  async me(@CurrentUser() user: Partial<UserEntity>): Promise<UserObject> {
    return await this.callUseCase(this.findOneUser, { email: user.email });
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Query(() => PaginatedUser)
  async users(@Args('input') input: ListUserInput): Promise<PaginatedUser> {
    return await this.callUseCase(this.listUsers, {
      filter: this.buildFilter(input),
      pagination: input.pagination,
    });
  }

  private buildFilter(input: ListUserInput): FilterQuery<UserEntity> {
    const filter: FilterQuery<UserEntity> = {};

    if (input.email) {
      filter.email = input.email;
    }

    if (input.role) {
      filter.role = input.role;
    }

    return filter;
  }
}
