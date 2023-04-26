import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getSecret } from 'src/config';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './graphql/auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { LoginUseCase } from './usecases/login.usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: getSecret(),
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [LoginUseCase, AuthResolver, JwtStrategy],
  exports: [LoginUseCase, AuthResolver, JwtStrategy],
})
export class AuthModule {}
