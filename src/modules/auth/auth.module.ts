import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getSecret } from 'src/config/jwt-secret';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './graphql/auth.resolver';
import { JwtStrategy } from './jwt.strategy';
import { LoginUseCase } from './usecases/login.usecase';
import { VerifyTokenUseCase } from './usecases/verify-token.usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: getSecret(),
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [LoginUseCase, AuthResolver, VerifyTokenUseCase, JwtStrategy],
  exports: [LoginUseCase, AuthResolver, VerifyTokenUseCase, JwtStrategy],
})
export class AuthModule {}
