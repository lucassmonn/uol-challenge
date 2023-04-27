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

    it('should call login with correct values and return success', async () => {
      const expectedLoginObject: LoginObject = {
        token: 'token',
      };
      loginUseCase.execute = jest.fn().mockResolvedValue(expectedLoginObject);

      const result = await authResolver.login(input);

      expect(loginUseCase.execute).toHaveBeenCalledWith(input);
      expect(result).toEqual(expectedLoginObject);
    });

    it('should return an error if login use case throws', async () => {
      const errorMessage = 'UseCase failed';
      loginUseCase.execute = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      const result = await authResolver.login(input);
      expect(result).toEqual(new Error(errorMessage));
      expect(loginUseCase.execute).toHaveBeenCalledWith(input);
    });
  });
});
