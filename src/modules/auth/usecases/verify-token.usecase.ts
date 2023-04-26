import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCaseBase } from 'src/shared/base/usecase.base';

@Injectable()
export class VerifyTokenUseCase implements UseCaseBase<string, any> {
  constructor(private jwtService: JwtService) {}

  execute(token: string): any {
    const decoded = this.jwtService.verify(token);
    return decoded;
  }
}
