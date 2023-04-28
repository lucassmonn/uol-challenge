import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { MessageOutput } from '@shared/interfaces/common-output.interface';
import { Types } from 'mongoose';
import { ContentRepository } from '../content.repository';

@Injectable()
export class DeleteContentUseCase
  implements UseCaseBase<Types.ObjectId, MessageOutput>
{
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(id: Types.ObjectId): Promise<MessageOutput> {
    const result = await this.contentRepository.deleteOne({ _id: id });
    return {
      message: `Deleted count: ${result.deletedCount}`,
      status: result.deletedCount > 0 ? 'success' : 'error',
    };
  }
}
