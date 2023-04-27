import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@shared/base/repository.base';
import { Model } from 'mongoose';
import { ContentEntity } from './content.entity';

@Injectable()
export class ContentRepository extends RepositoryBase<ContentEntity> {
  constructor(
    @InjectModel(ContentEntity.name) private contentModel: Model<ContentEntity>,
  ) {
    super(contentModel);
  }
}
