import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserResolver } from './graphql/user.resolver';
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
    forwardRef(() => AuthModule),
  ],
  providers: [UserResolver, UserRepository],
  exports: [UserResolver, UserRepository],
})
export class UserModule {}
