import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { Types } from 'mongoose';
import { ContentRepository } from '../content.repository';

@Injectable()
export class DeleteContentUseCase
  implements UseCaseBase<Types.ObjectId, boolean>
{
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(id: Types.ObjectId): Promise<boolean> {
    const result = await this.contentRepository.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
