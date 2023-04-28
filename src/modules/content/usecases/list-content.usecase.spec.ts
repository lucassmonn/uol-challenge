import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ContentEntity } from '../content.entity';
import { contentMapper } from '../content.mapper';
import { ContentRepository } from '../content.repository';
import { ListContentsUseCase } from './list-content.usecase';

describe('ListContentsUseCase', () => {
  let listContentsUseCase: ListContentsUseCase;
  let contentRepository: ContentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListContentsUseCase,
        {
          provide: ContentRepository,
          useFactory: () => ({
            findWithFiltersAndPagination: jest.fn(),
          }),
        },
      ],
    }).compile();

    listContentsUseCase = module.get<ListContentsUseCase>(ListContentsUseCase);
    contentRepository = module.get<ContentRepository>(ContentRepository);
  });

  it('should be defined', () => {
    expect(listContentsUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should list contents with pagination successfully', async () => {
      const contentEntity1 = new ContentEntity();
      contentEntity1._id = new Types.ObjectId();
      contentEntity1.title = 'Test Title 1';
      contentEntity1.description = 'Test Desc 1';
      contentEntity1.viewedBy = [];

      const contentEntity2 = new ContentEntity();
      contentEntity2._id = new Types.ObjectId();
      contentEntity2.title = 'Test Title 2';
      contentEntity2.description = 'Test Desc 2';
      contentEntity2.viewedBy = [];

      const request = {
        filter: {},
        pagination: {
          page: 1,
          perPage: 2,
        },
      };

      const repositoryResult = {
        data: [contentEntity1, contentEntity2],
        page: 1,
        perPage: 2,
        total: 2,
      };

      const expectedResult = {
        data: contentMapper.mapEntityToObjectArray(repositoryResult.data),
        page: repositoryResult.page,
        perPage: repositoryResult.perPage,
        total: repositoryResult.total,
      };

      contentRepository.findWithFiltersAndPagination = jest
        .fn()
        .mockResolvedValue(repositoryResult);

      const result = await listContentsUseCase.execute(request);

      expect(
        contentRepository.findWithFiltersAndPagination,
      ).toHaveBeenCalledWith(request.filter, request.pagination);
      expect(result).toEqual(expectedResult);
    });

    it('should handle exceptions', async () => {
      const request = {
        filter: {},
        pagination: {
          page: 1,
          perPage: 2,
        },
      };

      contentRepository.findWithFiltersAndPagination = jest
        .fn()
        .mockRejectedValue(new Error('Error listing contents'));

      await expect(listContentsUseCase.execute(request)).rejects.toThrowError(
        'Error listing contents',
      );
    });
  });
});
