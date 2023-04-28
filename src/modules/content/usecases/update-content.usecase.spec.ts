import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ContentEntity } from '../content.entity';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { UpdateContentInput } from '../inputs/update-content.input';
import { UpdateContentUsecase } from './update-content.usecase';

describe('UpdateContentUsecase', () => {
  let updateContentUsecase: UpdateContentUsecase;
  let contentRepository: ContentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateContentUsecase,
        {
          provide: ContentRepository,
          useFactory: () => ({
            updateOne: jest.fn(),
          }),
        },
      ],
    }).compile();

    updateContentUsecase =
      module.get<UpdateContentUsecase>(UpdateContentUsecase);
    contentRepository = module.get<ContentRepository>(ContentRepository);
  });

  it('should be defined', () => {
    expect(updateContentUsecase).toBeDefined();
  });

  describe('execute', () => {
    it('should update content successfully', async () => {
      const contentEntity = new ContentEntity();
      contentEntity._id = new Types.ObjectId();
      contentEntity.title = 'Test Title';
      contentEntity.description = 'Test Description';

      const updatedContentEntity = new ContentEntity();
      updatedContentEntity._id = contentEntity._id;
      updatedContentEntity.title = 'Updated Title';
      updatedContentEntity.description = 'Updated Description';
      updatedContentEntity.viewedBy = [];

      const updateContentInput: UpdateContentInput = {
        _id: contentEntity._id,
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const expectedResult =
        contentMapper.mapEntityToObject(updatedContentEntity);

      contentRepository.updateOne = jest
        .fn()
        .mockResolvedValue(updatedContentEntity);

      const result = await updateContentUsecase.execute(updateContentInput);

      expect(contentRepository.updateOne).toHaveBeenCalledWith(
        { _id: contentEntity._id },
        updateContentInput,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should handle exceptions', async () => {
      const updateContentInput: UpdateContentInput = {
        _id: new Types.ObjectId(),
        title: 'Updated Title',
        description: 'Updated Description',
      };

      contentRepository.updateOne = jest
        .fn()
        .mockRejectedValue(new Error('Error updating content'));

      await expect(
        updateContentUsecase.execute(updateContentInput),
      ).rejects.toThrowError('Error updating content');
    });
  });
});
