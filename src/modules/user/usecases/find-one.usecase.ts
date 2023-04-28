import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { UserObject } from '../graphql/user.object';
import { UserEntity } from '../user.entity';
import { userMapper } from '../user.mapper';
import { UserRepository } from '../user.repository';

@Injectable()
export class FindOneUserUseCase
  implements UseCaseBase<Partial<UserEntity>, UserObject>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: Partial<UserEntity>): Promise<UserObject> {
    const user = await this.userRepository.findOne(request);
    if (!user) throw new Error('User not found');
    return userMapper.mapEntityToObject(user);
  }
}
