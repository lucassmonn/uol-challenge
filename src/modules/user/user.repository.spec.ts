import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum } from './enum/role.enum';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(UserEntity.name),
          useValue: userModel,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user = {
        email: 'teste@gmail.com',
        role: RoleEnum.user,
      };
      jest.spyOn(userRepository, 'create').mockImplementation(async () => user);
      expect(await userRepository.create(user)).toBe(user);
    });
  });

  describe('find', () => {
    it('should find a user', async () => {
      const users = [
        {
          email: 'test@base.com',
          role: RoleEnum.user,
        },
      ];
      jest.spyOn(userRepository, 'find').mockImplementation(async () => users);
      expect(await userRepository.find({})).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should find a user', async () => {
      const user = {
          email: 'test@base.com',
          role: RoleEnum.user,
        },
        filter = {
          email: 'test@base.com',
        };
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async () => user);
      expect(await userRepository.findOne(filter)).toBe(user);
    });

    it('should not find a user', async () => {
      const user = null,
        filter = {
          email: 'test@base.com',
        };
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async () => user);
      expect(await userRepository.findOne(filter)).toBe(user);
    });
  });

  describe('updateOne', () => {
    it('should update a user', async () => {
      const user = {
          email: 'test@base.com',
          role: RoleEnum.user,
        },
        filter = {
          email: 'test@base.com',
        };
      jest
        .spyOn(userRepository, 'updateOne')
        .mockImplementation(async () => user);
      expect(await userRepository.updateOne(filter, user)).toBe(user);
    });
  });

  describe('deleteOne', () => {
    it('should delete a user', async () => {
      const filter = {
        email: 'test@base.com',
      };
      jest.spyOn(userRepository, 'deleteOne').mockImplementation(async () => ({
        deletedCount: 1,
      }));
      expect(await userRepository.deleteOne(filter)).toEqual({
        deletedCount: 1,
      });
    });
  });
});
