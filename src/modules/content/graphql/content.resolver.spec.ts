import { RoleEnum } from '@modules/user/enum/role.enum';
import { ListUsersUseCase } from '@modules/user/usecases/list.usecase';
import { UserEntity } from '@modules/user/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminGuard } from '@shared/guards/admin.guard';
import { JwtGuard } from '@shared/guards/auth.guard';
import { MessageOutput } from '@shared/interfaces/common-output.interface';
import { Types } from 'mongoose';
import { ContentTypeEnum } from '../enum/type.enum';
import {
  CreateContentInput,
  DeleteContentInput,
  ListContentInput,
  UpdateContentInput,
} from '../inputs';
import {
  CreateContentUseCase,
  DeleteContentUseCase,
  FindOneContentUseCase,
  ListContentsUseCase,
  UpdateContentUsecase,
} from '../usecases';
import { ContentObject, PaginatedContentObject } from './content.object';
import { ContentResolver } from './content.resolver';

describe('ContentResolver', () => {
  let contentResolver: ContentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentResolver,
        {
          provide: CreateContentUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: DeleteContentUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: UpdateContentUsecase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: ListUsersUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: ListContentsUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
        {
          provide: FindOneContentUseCase,
          useFactory: () => ({
            execute: jest.fn(),
          }),
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(AdminGuard)
      .useValue({ canActivate: () => true })
      .compile();

    contentResolver = module.get<ContentResolver>(ContentResolver);
  });

  it('should be defined', () => {
    expect(contentResolver).toBeDefined();
  });

  it('should create content', async () => {
    const createContentUseCase = contentResolver['createContentUseCase'];
    const mockInput: CreateContentInput = {
      description: 'mock description',
      title: 'mock title',
      type: ContentTypeEnum.image,
      url: 'mock url',
    };
    const expectedResult: ContentObject = {
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      description: 'mock description',
      title: 'mock title',
      type: ContentTypeEnum.image,
      url: 'mock url',
      updatedAt: new Date(),
      viewedBy: [],
      views: 0,
    };

    createContentUseCase.execute = jest
      .fn()
      .mockResolvedValueOnce(expectedResult);

    const result = await contentResolver.createContent(mockInput);

    expect(createContentUseCase.execute).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(expectedResult);
  });

  it('should update content', async () => {
    const updateContentUseCase = contentResolver['updateContentUseCase'];
    const mockInput: UpdateContentInput = {
      _id: new Types.ObjectId(),
      description: 'mock description updated',
    };
    const expectedResult: ContentObject = {
      _id: mockInput._id,
      createdAt: new Date(),
      description: 'mock description updated',
      title: 'mock title',
      type: ContentTypeEnum.image,
      url: 'mock url',
      updatedAt: new Date(),
      viewedBy: [],
      views: 0,
    };

    updateContentUseCase.execute = jest
      .fn()
      .mockResolvedValueOnce(expectedResult);

    const result = await contentResolver.updateContent(mockInput);

    expect(updateContentUseCase.execute).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(expectedResult);
  });

  it('should delete content', async () => {
    const deleteContentUseCase = contentResolver['deleteContentUseCase'];
    const mockInput: DeleteContentInput = {
      _id: new Types.ObjectId(),
    };
    const expectedResult: MessageOutput = {
      message: 'Deleted count: 1',
      status: 'success',
    };

    deleteContentUseCase.execute = jest
      .fn()
      .mockResolvedValueOnce(expectedResult);

    const result = await contentResolver.deleteContent(mockInput);

    expect(deleteContentUseCase.execute).toHaveBeenCalledWith(mockInput._id);
    expect(result).toEqual(expectedResult);
  });

  it('should list contents', async () => {
    const listContentsUseCase = contentResolver['listContentsUseCase'];
    const mockInput: ListContentInput = {
      type: ContentTypeEnum.image,
      pagination: {
        page: 1,
        perPage: 10,
      },
    };
    const expectedResult: PaginatedContentObject = {
      data: [
        {
          _id: new Types.ObjectId(),
          createdAt: new Date(),
          description: 'mock description',
          title: 'mock title',
          type: ContentTypeEnum.image,
          url: 'mock url',
          updatedAt: new Date(),
          viewedBy: [],
          views: 0,
        },
      ],
      page: 1,
      perPage: 10,
      total: 1,
    };

    listContentsUseCase.execute = jest
      .fn()
      .mockResolvedValueOnce(expectedResult);

    const result = await contentResolver.contents(mockInput);

    expect(listContentsUseCase.execute).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  it('should find content', async () => {
    const findOneContentUseCase = contentResolver['findOneContentUseCase'];
    const mockId = new Types.ObjectId();
    const mockUser: Partial<UserEntity> = {
      _id: new Types.ObjectId(),
      role: RoleEnum.user,
    };
    const expectedResult: ContentObject = {
      _id: mockId,
      createdAt: new Date(),
      description: 'mock description',
      title: 'mock title',
      type: ContentTypeEnum.image,
      url: 'mock url',
      updatedAt: new Date(),
      viewedBy: [mockUser._id],
      views: 1,
    };

    findOneContentUseCase.execute = jest
      .fn()
      .mockResolvedValueOnce(expectedResult);

    const result = await contentResolver.content(String(mockId), mockUser);

    expect(findOneContentUseCase.execute).toHaveBeenCalledWith({
      input: { _id: mockId },
      user: mockUser,
    });
    expect(result).toEqual(expectedResult);
  });
});
