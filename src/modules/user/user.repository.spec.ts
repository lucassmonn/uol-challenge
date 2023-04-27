import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { RoleEnum } from './enum/role.enum';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel: Model<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(UserEntity.name),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userModel = module.get<Model<UserEntity>>(getModelToken(UserEntity.name));
  });

  describe('findByEmail', () => {
    it('should return a user entity', async () => {
      const email = 'test@email.com';
      const userEntity = {
        _id: '644cbja44d62bf75f0f431d6',
        email,
        role: RoleEnum.user,
      };

      jest.spyOn(userModel, 'findOne').mockReturnValueOnce({
        lean: jest.fn().mockResolvedValueOnce(userEntity),
      } as any);

      const result = await userRepository.findByEmail(email);

      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(userEntity);
    });

    it('should return null if user not found', async () => {
      const email = 'not-found@email.com';
      jest.spyOn(userModel, 'findOne').mockReturnValueOnce({
        lean: jest.fn().mockResolvedValueOnce(null),
      } as any);
      const result = await userRepository.findByEmail(email);
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toBeNull();
    });
  });
});
