import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { Types } from 'mongoose';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { ContentObject } from '../graphql/content.object';
import { UpdateContentInput } from '../inputs/update.input';

@Injectable()
export class UpdateContentUsecase
  implements UseCaseBase<UpdateContentInput, ContentObject>
{
  constructor(private readonly contentRepository: ContentRepository) {}
  async execute(request: UpdateContentInput): Promise<ContentObject> {
    const result = await this.contentRepository.updateOne(
      { _id: new Types.ObjectId(request._id) },
      request,
    );

    return contentMapper.mapEntityToObject(result);
  }
}
