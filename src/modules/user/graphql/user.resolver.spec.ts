import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { PinoLogger } from 'nestjs-pino';
import { RoleEnum } from '../enum/role.enum';
import { ListUserInput } from '../inputs/list-user.input';
import { FindOneUserUseCase } from '../usecases/find-one.usecase';
import { ListUsersUseCase } from '../usecases/list.usecase';
import { UserEntity } from '../user.entity';
import { PaginatedUser, UserObject } from './user.object';
import { UserResolver } from './user.resolver';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let listUsersUseCase: ListUsersUseCase;
  let findOneUserUseCase: FindOneUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: ListUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindOneUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: PinoLogger,
          useValue: {
            setContext: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
      imports: [],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    listUsersUseCase = module.get<ListUsersUseCase>(ListUsersUseCase);
    findOneUserUseCase = module.get<FindOneUserUseCase>(FindOneUserUseCase);
  });

  describe('me', () => {
    it('should return the user object for a valid user', async () => {
      const user: Partial<UserEntity> = { email: 'test@example.com' };
      const expectedUserObject: UserObject = {
        _id: new Types.ObjectId(),
        email: 'test@example.com',
        role: RoleEnum.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(findOneUserUseCase, 'execute')
        .mockResolvedValue(expectedUserObject);

      const result = await resolver.me(user);

      expect(result).toEqual(expectedUserObject);
      expect(findOneUserUseCase.execute).toHaveBeenCalledWith({
        email: user.email,
      });
    });
  });

  describe('users', () => {
    it('should return a paginated list of users for valid input', async () => {
      const input: ListUserInput = {
        email: 'test@example.com',
        role: RoleEnum.user,
        pagination: { page: 1, perPage: 10 },
      };
      const expectedPaginatedUser: PaginatedUser = {
        total: 1,
        page: 1,
        perPage: 10,
        data: [
          {
            _id: new Types.ObjectId(),
            email: 'test@example.com',
            role: RoleEnum.user,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };
      jest
        .spyOn(listUsersUseCase, 'execute')
        .mockResolvedValue(expectedPaginatedUser);

      const result = await resolver.users(input);

      expect(result).toEqual(expectedPaginatedUser);
      expect(listUsersUseCase.execute).toHaveBeenCalledWith({
        filter: { email: input.email, role: input.role },
        pagination: input.pagination,
      });
    });

    it('should return an empty paginated list of users for invalid input', async () => {
      const input: ListUserInput = {
        role: 'invalid' as RoleEnum,
        pagination: { page: 1, perPage: 10 },
      };
      const expectedPaginatedUser: PaginatedUser = {
        total: 0,
        data: [],
        page: 1,
        perPage: 10,
      };
      jest
        .spyOn(listUsersUseCase, 'execute')
        .mockResolvedValue(expectedPaginatedUser);

      const result = await resolver.users(input);

      expect(result).toEqual(expectedPaginatedUser);
      expect(listUsersUseCase.execute).toHaveBeenCalledWith({
        filter: { role: 'invalid' as RoleEnum },
        pagination: input.pagination,
      });
    });
  });
});
