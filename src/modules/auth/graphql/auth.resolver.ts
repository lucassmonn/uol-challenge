import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ResolverBase } from '@shared/base/resolver.base';
import { PinoLogger } from 'nestjs-pino';
import { LoginInput } from '../inputs/login.input';
import { LoginUseCase } from '../usecases/login.usecase';
import { LoginObject } from './login.object';

@Resolver()
export class AuthResolver extends ResolverBase {
  constructor(private readonly loginUseCase: LoginUseCase) {
    super(new PinoLogger({}));
  }
  @Mutation(() => LoginObject)
  async login(@Args('input') input: LoginInput): Promise<LoginObject> {
    return await this.callUseCase(this.loginUseCase, input);
  }
}
