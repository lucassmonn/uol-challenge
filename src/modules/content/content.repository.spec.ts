import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { ContentEntity } from './content.entity';
import { ContentRepository } from './content.repository';

describe('ContentRepository', () => {
  let contentRepository: ContentRepository;
  let contentModel: Model<ContentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentRepository,
        {
          provide: getModelToken(ContentEntity.name),
          useValue: {
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    contentRepository = module.get<ContentRepository>(ContentRepository);
    contentModel = module.get<Model<ContentEntity>>(
      getModelToken(ContentEntity.name),
    );
  });

  describe('addViewIfNotExists', () => {
    it('should add a new view if the content has not been viewed by the user before', async () => {
      const filter = { _id: '644af220e33c0eb8cbd8d882' };
      const id = new Types.ObjectId();

      contentModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
        _id: '644af220e33c0eb8cbd8d882',
        viewedBy: ['634af220e33c0eb8cbd8d982', id],
      });

      const result = await contentRepository.addViewIfNotExists(filter, id);

      expect(contentModel.findOneAndUpdate).toHaveBeenCalledWith(
        filter,
        { $addToSet: { viewedBy: id } },
        { new: true, lean: true },
      );
      expect(result).toEqual({
        _id: '644af220e33c0eb8cbd8d882',
        viewedBy: ['634af220e33c0eb8cbd8d982', id],
      });
    });

    it('should not add a new view if the content has been viewed by the user before', async () => {
      const filter = { _id: '644af220e33c0eb8cbd8d882' };
      const id = new Types.ObjectId();

      contentModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce({
        _id: '644af220e33c0eb8cbd8d882',
        viewedBy: [id, '634af220e33c0eb8cbd8c493'],
      });

      const result = await contentRepository.addViewIfNotExists(filter, id);

      expect(contentModel.findOneAndUpdate).toHaveBeenCalledWith(
        filter,
        { $addToSet: { viewedBy: id } },
        { new: true, lean: true },
      );
      expect(result).toEqual({
        _id: '644af220e33c0eb8cbd8d882',
        viewedBy: [id, '634af220e33c0eb8cbd8c493'],
      });
    });
  });
});
