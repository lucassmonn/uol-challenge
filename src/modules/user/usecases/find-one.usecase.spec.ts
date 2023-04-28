import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { RoleEnum } from '../enum/role.enum';
import { UserEntity } from '../user.entity';
import { userMapper } from '../user.mapper';
import { UserRepository } from '../user.repository';
import { FindOneUserUseCase } from './find-one.usecase';

describe('FindOneUserUseCase', () => {
  let findOneUserUseCase: FindOneUserUseCase;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindOneUserUseCase,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    findOneUserUseCase = moduleRef.get<FindOneUserUseCase>(FindOneUserUseCase);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('should return a user', async () => {
    const request: Partial<UserEntity> = { _id: new Types.ObjectId() };

    const mockUser = {
      _id: request._id,
      name: 'User 1',
      email: 'user1@example.com',
      role: RoleEnum.user,
    };

    userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

    const result = await findOneUserUseCase.execute(request);

    expect(userRepository.findOne).toHaveBeenCalledWith(request);
    expect(result).toMatchObject(userMapper.mapEntityToObject(mockUser));
  });

  it('should throw an error when user is not found', async () => {
    const request: Partial<UserEntity> = { _id: new Types.ObjectId() };

    userRepository.findOne = jest.fn().mockResolvedValue(null);

    await expect(findOneUserUseCase.execute(request)).rejects.toThrowError(
      'User not found',
    );

    expect(userRepository.findOne).toHaveBeenCalledWith(request);
  });

  it('should handle exceptions', async () => {
    const request: Partial<UserEntity> = { _id: new Types.ObjectId() };

    userRepository.findOne = jest
      .fn()
      .mockRejectedValue(new Error('Database error'));

    await expect(findOneUserUseCase.execute(request)).rejects.toThrowError(
      'Database error',
    );

    expect(userRepository.findOne).toHaveBeenCalledWith(request);
  });
});
