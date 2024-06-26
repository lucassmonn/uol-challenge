import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './graphql/user.resolver';
import { FindOneUserUseCase, ListUsersUseCase } from './usecases';
import { UserEntity, UserSchema } from './user.entity';
import { UserRepository } from './user.repository';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UserResolver,
    UserRepository,
    FindOneUserUseCase,
    ListUsersUseCase,
  ],
  exports: [UserResolver, FindOneUserUseCase, ListUsersUseCase],
})
export class UserModule {}
