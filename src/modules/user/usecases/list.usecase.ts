import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import {
  PaginatedOutput,
  WithPagination,
} from '@shared/interfaces/pagination.interface';
import { UserObject } from '../graphql/user.object';
import { UserEntity } from '../user.entity';
import { userMapper } from '../user.mapper';
import { UserRepository } from '../user.repository';

@Injectable()
export class ListUsersUseCase
  implements
    UseCaseBase<WithPagination<UserEntity>, PaginatedOutput<UserObject>>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    request: WithPagination<UserEntity>,
  ): Promise<PaginatedOutput<UserObject>> {
    const result = await this.userRepository.findWithFiltersAndPagination(
      request.filter,
      request.pagination,
    );

    return {
      data: userMapper.mapEntityToObjectArray(result.data),
      page: result.page,
      perPage: result.perPage,
      total: result.total,
    };
  }
}
