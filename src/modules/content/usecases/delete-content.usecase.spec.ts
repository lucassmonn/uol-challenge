import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { ContentRepository } from '../content.repository';
import { DeleteContentUseCase } from './delete-content.usecase';

describe('DeleteContentUseCase', () => {
  let deleteContentUseCase: DeleteContentUseCase;
  let contentRepository: ContentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteContentUseCase,
        {
          provide: ContentRepository,
          useFactory: () => ({
            deleteOne: jest.fn(),
          }),
        },
      ],
    }).compile();

    deleteContentUseCase =
      module.get<DeleteContentUseCase>(DeleteContentUseCase);
    contentRepository = module.get<ContentRepository>(ContentRepository);
  });

  it('should be defined', () => {
    expect(deleteContentUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should delete content successfully', async () => {
      const id = new Types.ObjectId();
      const deletedCount = 1;
      const expectedResult = {
        message: `Deleted count: ${deletedCount}`,
        status: 'success',
      };

      contentRepository.deleteOne = jest
        .fn()
        .mockResolvedValue({ deletedCount });

      const result = await deleteContentUseCase.execute(id);

      expect(contentRepository.deleteOne).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual(expectedResult);
    });

    it('should return error status when content is not found', async () => {
      const id = new Types.ObjectId();
      const deletedCount = 0;
      const expectedResult = {
        message: `Deleted count: ${deletedCount}`,
        status: 'error',
      };

      contentRepository.deleteOne = jest
        .fn()
        .mockResolvedValue({ deletedCount });

      const result = await deleteContentUseCase.execute(id);

      expect(contentRepository.deleteOne).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual(expectedResult);
    });

    it('should handle exceptions', async () => {
      const id = new Types.ObjectId();

      contentRepository.deleteOne = jest
        .fn()
        .mockRejectedValue(new Error('Error deleting content'));

      await expect(deleteContentUseCase.execute(id)).rejects.toThrowError(
        'Error deleting content',
      );
    });
  });
});
