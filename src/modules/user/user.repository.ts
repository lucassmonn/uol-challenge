import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RepositoryBase } from '@shared/base/repository.base';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends RepositoryBase<UserEntity> {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {
    super(userModel);
  }
}
