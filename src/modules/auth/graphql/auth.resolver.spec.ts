import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginInput } from '../inputs/login.input';
import { LoginUseCase } from '../usecases/login.usecase';
import { AuthResolver } from './auth.resolver';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let usecase: LoginUseCase;
  let jwtService: JwtService;

  const loginUseCaseMock = {
    execute: jest.fn(),
  };

  const jwtServiceMock = {
    sign: jest.fn(),
  };

  const modelMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: LoginUseCase, useValue: loginUseCaseMock },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: getModelToken('UserEntity'), useValue: modelMock },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    usecase = module.get<LoginUseCase>(LoginUseCase);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginInput: LoginInput = {
      email: 'test@test.com',
    };

    it('should call use case with correct parameters', async () => {
      const token = 'token123';
      jest.spyOn(usecase, 'execute').mockResolvedValue({ token });

      await resolver.login(loginInput);

      expect(usecase.execute).toHaveBeenCalledWith(loginInput);
    });

    it('should return the correct object', async () => {
      const token = 'token123';
      jest.spyOn(usecase, 'execute').mockResolvedValue({ token });
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const response = await resolver.login(loginInput);

      expect(response).toEqual({ token });
    });
  });
});
