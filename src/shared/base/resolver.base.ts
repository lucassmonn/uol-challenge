import { UseCaseBase } from './usecase.base';

export abstract class ResolverBase {
  async callUseCase<Input, Output>(
    useCase: UseCaseBase<Input, Output>,
    input: Input,
  ): Promise<Output | Error | any> {
    try {
      return await useCase.execute(input);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
