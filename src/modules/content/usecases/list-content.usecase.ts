import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import {
  PaginatedOutput,
  WithPagination,
} from '@shared/interfaces/pagination.interface';
import { ContentEntity } from '../content.entity';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { ContentObject } from '../graphql/content.object';

@Injectable()
export class ListContentsUseCase
  implements
    UseCaseBase<WithPagination<ContentEntity>, PaginatedOutput<ContentObject>>
{
  constructor(private readonly contentRepository: ContentRepository) {}
  async execute(
    request: WithPagination<ContentEntity>,
  ): Promise<PaginatedOutput<ContentObject>> {
    const result = await this.contentRepository.findWithFiltersAndPagination(
      request.filter,
      request.pagination,
    );
    return {
      data: contentMapper.mapEntityToObjectArray(result.data),
      page: result.page,
      perPage: result.perPage,
      total: result.total,
    };
  }
}
