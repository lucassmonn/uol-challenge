import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from './graphql/user.resolver';
import { UserEntity, UserSchema } from './user.entity';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserResolver],
  exports: [UserResolver],
})
export class UserModule {}
