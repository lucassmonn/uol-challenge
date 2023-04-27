import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { ObjectId } from 'mongoose';
import { ContentRepository } from '../content.repository';

@Injectable()
export class DeleteContentUseCase implements UseCaseBase<ObjectId, boolean> {
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(id: ObjectId): Promise<boolean> {
    const result = await this.contentRepository.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
