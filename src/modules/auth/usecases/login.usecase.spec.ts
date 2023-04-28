import { FindOneUserUseCase } from '@modules/user/usecases/find-one.usecase';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from './login.usecase';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let findOneUserUseCase: FindOneUserUseCase;
  let jwtService: JwtService;

  beforeEach(() => {
    findOneUserUseCase = { execute: jest.fn() } as any;
    jwtService = { sign: jest.fn() } as any;
    loginUseCase = new LoginUseCase(findOneUserUseCase, jwtService);
  });

  describe('execute', () => {
    const email = 'test@example.com';

    it('should return a token if user is found', async () => {
      const user = { _id: '1', email, role: 'user' };
      const token = 'jwt token';
      findOneUserUseCase.execute = jest.fn().mockResolvedValue(user);
      jwtService.sign = jest.fn().mockReturnValue(token);

      const result = await loginUseCase.execute({ email });

      expect(result).toEqual({ token });
      expect(findOneUserUseCase.execute).toHaveBeenCalledWith({ email });
      expect(jwtService.sign).toHaveBeenCalledWith({
        email,
        role: user.role,
        sub: user._id,
      });
    });

    it('should throw an error if user is not found', async () => {
      findOneUserUseCase.execute = jest.fn().mockResolvedValue(undefined);

      await expect(loginUseCase.execute({ email })).rejects.toThrowError(
        'User not found',
      );
      expect(findOneUserUseCase.execute).toHaveBeenCalledWith({ email });
    });
  });
});
