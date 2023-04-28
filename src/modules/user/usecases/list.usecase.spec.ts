import { Test } from '@nestjs/testing';
import { WithPagination } from '@shared/interfaces/pagination.interface';
import { RoleEnum } from '../enum/role.enum';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../user.repository';
import { ListUsersUseCase } from './list.usecase';

describe('ListUsersUseCase', () => {
  let listUsersUseCase: ListUsersUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListUsersUseCase,
        {
          provide: UserRepository,
          useValue: {
            findWithFiltersAndPagination: jest.fn(),
          },
        },
      ],
    }).compile();

    listUsersUseCase = moduleRef.get<ListUsersUseCase>(ListUsersUseCase);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should return paginated users', async () => {
    const filter: Partial<UserEntity> = { role: RoleEnum.user };
    const pagination = { page: 1, perPage: 10 };

    const request: WithPagination<UserEntity> = {
      filter,
      pagination,
    };

    const mockPaginatedResult = {
      data: [
        {
          _id: '1',
          email: 'user1@example.com',
          role: 'user',
        },
        {
          _id: '2',
          email: 'user2@example.com',
          role: 'user',
        },
      ],
      page: 1,
      perPage: 10,
      total: 2,
    };

    userRepository.findWithFiltersAndPagination = jest
      .fn()
      .mockResolvedValue(mockPaginatedResult);

    const result = await listUsersUseCase.execute(request);

    expect(userRepository.findWithFiltersAndPagination).toHaveBeenCalledWith(
      filter,
      pagination,
    );
    expect(result).toMatchObject({
      data: expect.any(Array),
      page: mockPaginatedResult.page,
      perPage: mockPaginatedResult.perPage,
      total: mockPaginatedResult.total,
    });
  });
});
