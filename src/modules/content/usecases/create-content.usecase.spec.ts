import { Test, TestingModule } from '@nestjs/testing';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { ContentTypeEnum } from '../enum/type.enum';
import { CreateContentInput } from '../inputs/create-content.input';
import { CreateContentUseCase } from './create-content.usecase';

describe('CreateContentUseCase', () => {
  let createContentUseCase: CreateContentUseCase;
  let contentRepository: ContentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContentUseCase,
        {
          provide: ContentRepository,
          useFactory: () => ({
            create: jest.fn() as any,
          }),
        },
      ],
    }).compile();

    createContentUseCase =
      module.get<CreateContentUseCase>(CreateContentUseCase);
    contentRepository = module.get<ContentRepository>(ContentRepository);
  });

  it('should be defined', () => {
    expect(createContentUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create content successfully', async () => {
      const req: CreateContentInput = {
        title: 'Test Title',
        description: 'Test Description',
        type: ContentTypeEnum.image,
        url: 'https://test.com/image.png',
      };

      const expectedEntity = contentMapper.mapInputCreateToEntity(req);

      contentRepository.create = jest.fn().mockResolvedValue(expectedEntity);

      const result = await createContentUseCase.execute(req);
      const expectedObject = contentMapper.mapEntityToObject(result);

      expect(contentRepository.create).toHaveBeenCalledWith(expectedEntity);
      expect(result).toEqual(expectedObject);
    });

    it('should handle exceptions', async () => {
      const req: CreateContentInput = {
        title: 'Test Title',
        description: 'Test Description',
        type: ContentTypeEnum.image,
        url: 'https://test.com/image.png',
      };

      contentRepository.create = jest
        .fn()
        .mockRejectedValue(new Error('Error creating content'));

      await expect(createContentUseCase.execute(req)).rejects.toThrowError(
        'Error creating content',
      );
    });
  });
});
