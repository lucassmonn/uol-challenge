import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/user.repository';
import { UseCaseBase } from 'src/shared/base/usecase.base';
import { LoginObject } from '../graphql/login.object';
import { LoginInput } from '../inputs/login.input';

@Injectable()
export class LoginUseCase implements UseCaseBase<LoginInput, LoginObject> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(request: LoginInput): Promise<LoginObject> {
    const user = await this.userRepository.findByEmail(request.email);

    return {
      token: this.jwtService.sign({
        email: user.email,
        role: user.role,
        sub: user._id,
      }),
    };
  }
}
