import { Injectable } from '@nestjs/common';
import { UseCaseBase } from '@shared/base/usecase.base';
import { UserEntity } from '../user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class FindOneUserUseCase
  implements UseCaseBase<Partial<UserEntity>, UserEntity>
{
  constructor(private readonly userRepository: UserRepository) {}

  execute(request: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(request);
  }
}
