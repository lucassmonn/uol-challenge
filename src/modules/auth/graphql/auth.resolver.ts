import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput } from '../inputs/login.input';
import { LoginUseCase } from '../usecases/login.usecase';
import { LoginObject } from './login.object';

@Resolver()
export class AuthResolver {
  constructor(private readonly loginUseCase: LoginUseCase) {}
  @Mutation(() => LoginObject)
  async login(@Args('input') input: LoginInput): Promise<LoginObject> {
    return await this.loginUseCase.execute(input);
  }
}
