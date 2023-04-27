import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { ContentObject } from '../graphql/content.object';
import { CreateContentInput } from '../inputs/create.input';

@Injectable()
export class CreateContentUseCase
  implements UseCaseBase<CreateContentInput, ContentObject>
{
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(req: CreateContentInput): Promise<ContentObject> {
    const content = await this.contentRepository.create(
      contentMapper.mapInputCreateToEntity(req),
    );

    return contentMapper.mapEntityToObject(content);
  }
}
