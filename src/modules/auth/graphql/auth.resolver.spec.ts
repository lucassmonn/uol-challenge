import { Test, TestingModule } from '@nestjs/testing';
import { LoginInput } from '../inputs/login.input';
import { LoginUseCase } from '../usecases/login.usecase';
import { AuthResolver } from './auth.resolver';
import { LoginObject } from './login.object';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let loginUseCase: LoginUseCase;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: LoginUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    authResolver = moduleRef.get<AuthResolver>(AuthResolver);
    loginUseCase = moduleRef.get<LoginUseCase>(LoginUseCase);
  });

  describe('login', () => {
    const input: LoginInput = {
      email: 'test@example.com',
    };

    it('should call the login use case with the correct input and return the result', async () => {
      const expectedLoginObject: LoginObject = {
        token: 'token',
      };
      loginUseCase.execute = jest.fn().mockResolvedValue(expectedLoginObject);

      const result = await authResolver.login(input);

      expect(loginUseCase.execute).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedLoginObject);
    });

    it('should throw an error when the login use case fails', async () => {
      const errorMessage = 'Authentication failed';
      loginUseCase.execute = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await expect(authResolver.login(input)).rejects.toThrowError(
        errorMessage,
      );
      expect(loginUseCase.execute).toHaveBeenCalledWith(input);
    });

    it('should handle unexpected errors', async () => {
      const errorMessage = 'Unexpected error';
      loginUseCase.execute = jest.fn().mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await expect(authResolver.login(input)).rejects.toThrowError(
        errorMessage,
      );
      expect(loginUseCase.execute).toHaveBeenCalledWith(input);
    });
  });
});
