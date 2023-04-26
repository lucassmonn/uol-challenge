import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RepositoryBase } from 'src/shared/base/repository.base';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends RepositoryBase<UserEntity> {
  constructor(@InjectModel(UserEntity.name) userModel: Model<UserEntity>) {
    super(userModel);
  }
}
