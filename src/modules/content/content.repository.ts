import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@shared/base/repository.base';
import { FilterQuery, Model, Types } from 'mongoose';
import { ContentEntity } from './content.entity';

@Injectable()
export class ContentRepository extends RepositoryBase<ContentEntity> {
  constructor(
    @InjectModel(ContentEntity.name) private contentModel: Model<ContentEntity>,
  ) {
    super(contentModel);
  }

  async addViewIfNotExists(
    filter: FilterQuery<ContentEntity>,
    id: Types.ObjectId,
  ): Promise<ContentEntity> {
    const test = await this.contentModel.findOneAndUpdate(
      filter,
      {
        $addToSet: { viewedBy: id },
      },
      {
        new: true,
        lean: true,
      },
    );

    return test;
  }
}
