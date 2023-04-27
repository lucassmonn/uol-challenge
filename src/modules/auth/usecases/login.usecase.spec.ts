import { UserRepository } from '@modules/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginInput } from '../inputs/login.input';
import { LoginUseCase } from './login.usecase';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let userRepository: UserRepository;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        { provide: UserRepository, useValue: {} },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    loginUseCase = moduleRef.get<LoginUseCase>(LoginUseCase);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('should successfully login', async () => {
    const email = 'test@example.com';
    const user = { email, role: 'user', _id: '123' };
    const token = 'jwt-token';

    userRepository.findByEmail = jest.fn().mockResolvedValue(user);
    jwtService.sign = jest.fn().mockReturnValue(token);

    const loginInput: LoginInput = { email };
    const result = await loginUseCase.execute(loginInput);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(jwtService.sign).toHaveBeenCalledWith({
      email: user.email,
      role: user.role,
      sub: user._id,
    });
    expect(result).toEqual({ token });
  });

  it('should fail login due to user not found', async () => {
    const email = 'test@example.com';

    userRepository.findByEmail = jest.fn().mockResolvedValue(null);

    const loginInput: LoginInput = { email };
    await expect(loginUseCase.execute(loginInput)).rejects.toThrowError(
      'User not found',
    );
  });

  it('should fail login due to JWT token generation failure', async () => {
    const email = 'test@example.com';
    const user = { email, role: 'user', _id: '123' };

    userRepository.findByEmail = jest.fn().mockResolvedValue(user);
    jwtService.sign = jest.fn().mockImplementation(() => {
      throw new Error('JWT token generation failure');
    });

    const loginInput: LoginInput = { email };
    await expect(loginUseCase.execute(loginInput)).rejects.toThrowError(
      'JWT token generation failure',
    );
  });

  it('should handle unexpected exceptions', async () => {
    const email = 'test@example.com';

    userRepository.findByEmail = jest.fn().mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const loginInput: LoginInput = { email };
    await expect(loginUseCase.execute(loginInput)).rejects.toThrowError(
      'Unexpected error',
    );
  });
});
