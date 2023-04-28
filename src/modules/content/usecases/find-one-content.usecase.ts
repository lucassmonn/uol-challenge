import { RoleEnum } from '@modules/user/enum/role.enum';
import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { Types } from 'mongoose';
import { ContentEntity } from '../content.entity';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { ContentObject } from '../graphql/content.object';

type Input = { input: Partial<ContentEntity> } & {
  user?: {
    _id: Types.ObjectId;
    role: RoleEnum;
  };
};

@Injectable()
export class FindOneContentUseCase
  implements UseCaseBase<Input, ContentObject>
{
  constructor(private readonly contentRepository: ContentRepository) {}

  async execute(req: Input): Promise<ContentObject> {
    const { input } = req;
    let content = await this.contentRepository.findOne(input);
    if (!content) throw new Error('Content not found');

    if (req.user && req.user.role === RoleEnum.user) {
      content = await this.contentRepository.addViewIfNotExists(
        {
          _id: content._id,
        },
        req.user._id,
      );
    }

    return contentMapper.mapEntityToObject(content);
  }
}
