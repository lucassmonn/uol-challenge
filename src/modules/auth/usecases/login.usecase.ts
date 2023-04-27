import { FindOneUserUseCase } from '@modules/user/usecases/find-one.usecase';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCaseBase } from '@shared/base/usecase.base';
import { LoginObject } from '../graphql/login.object';
import { LoginInput } from '../inputs/login.input';

@Injectable()
export class LoginUseCase implements UseCaseBase<LoginInput, LoginObject> {
  constructor(
    private findOneUser: FindOneUserUseCase,
    private jwtService: JwtService,
  ) {}

  async execute(request: LoginInput): Promise<LoginObject> {
    const user = await this.findOneUser.execute({ email: request.email });
    if (!user) throw new Error('User not found');

    return {
      token: this.jwtService.sign({
        email: user.email,
        role: user.role,
        sub: user._id,
      }),
    };
  }
}
