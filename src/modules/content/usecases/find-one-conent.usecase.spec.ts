import { RoleEnum } from '@modules/user/enum/role.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ContentEntity } from '../content.entity';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { ContentTypeEnum } from '../enum/type.enum';
import { FindOneContentUseCase } from './find-one-content.usecase';

describe('FindOneContentUseCase', () => {
  let findOneContentUseCase: FindOneContentUseCase;
  let contentRepository: ContentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneContentUseCase,
        {
          provide: ContentRepository,
          useFactory: () => ({
            findOne: jest.fn(),
            addViewIfNotExists: jest.fn(),
          }),
        },
      ],
    }).compile();

    findOneContentUseCase = module.get<FindOneContentUseCase>(
      FindOneContentUseCase,
    );
    contentRepository = module.get<ContentRepository>(ContentRepository);
  });

  it('should be defined', () => {
    expect(findOneContentUseCase).toBeDefined();
  });

  describe('execute', () => {
    const contentEntity: ContentEntity = {
      _id: new Types.ObjectId('644af220e33c0eb8cbd8d882'),
      createdAt: new Date(),
      description: 'Description',
      title: 'Title',
      type: ContentTypeEnum.image,
      url: 'https://test.com/image.png',
      updatedAt: new Date(),
      viewedBy: [],
    };

    it('should find content successfully', async () => {
      contentEntity._id = new Types.ObjectId('644af220e33c0eb8cbd8d882');
      contentEntity.title = 'Test Title';
      contentEntity.description = 'Test Description';
      const input = { _id: contentEntity._id };

      contentRepository.findOne = jest.fn().mockResolvedValue(contentEntity);

      const result = await findOneContentUseCase.execute({ input });
      const expectedResult = contentMapper.mapEntityToObject(result);

      expect(contentRepository.findOne).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error when content is not found', async () => {
      const input = { _id: new Types.ObjectId() };

      contentRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(
        findOneContentUseCase.execute({ input }),
      ).rejects.toThrowError('Content not found');
    });

    it('should add view for user role', async () => {
      contentEntity._id = new Types.ObjectId('644af220e33c0eb8cbd8d882');
      contentEntity.title = 'Test Title';
      contentEntity.description = 'Test Description';

      const input = { _id: contentEntity._id };
      const user = {
        _id: new Types.ObjectId(),
        role: RoleEnum.user,
      };

      contentRepository.findOne = jest.fn().mockResolvedValue(contentEntity);
      contentRepository.addViewIfNotExists = jest.fn().mockResolvedValue({
        ...contentEntity,
        viewedBy: [user._id],
      });

      const result = await findOneContentUseCase.execute({ input, user });
      const expectedResult = contentMapper.mapEntityToObject(result);

      expect(contentRepository.findOne).toHaveBeenCalledWith(input);
      expect(contentRepository.addViewIfNotExists).toHaveBeenCalledWith(
        { _id: contentEntity._id },
        user._id,
      );
      expect(result).toEqual(expectedResult);
    });

    it('should handle exceptions', async () => {
      const input = { _id: new Types.ObjectId() };

      contentRepository.findOne = jest
        .fn()
        .mockRejectedValue(new Error('Error finding content'));

      await expect(
        findOneContentUseCase.execute({ input }),
      ).rejects.toThrowError('Error finding content');
    });
  });
});
