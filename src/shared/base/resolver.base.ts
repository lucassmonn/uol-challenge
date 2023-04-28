import { PinoLogger } from 'nestjs-pino';
import { UseCaseBase } from './usecase.base';

export abstract class ResolverBase {
  constructor(protected readonly logger: PinoLogger) {}
  async callUseCase<Input, Output>(
    useCase: UseCaseBase<Input, Output>,
    input: Input,
  ): Promise<Output | Error | any> {
    try {
      const result = await useCase.execute(input);
      this.logger.info(
        { request: input, response: result },
        `[USECASE] ${useCase.constructor.name} executed successfully`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        { request: input, error: error.message },
        `[USECASE] ${useCase.constructor.name} failed to execute`,
      );
      return error;
    }
  }
}
