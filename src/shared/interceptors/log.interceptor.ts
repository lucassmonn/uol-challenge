import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    logger.setContext(LoggingInterceptor.name);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const info = gqlCtx.getInfo();
    const operationType = info.operation.operation;
    const fieldName = info.fieldName;

    const start = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.debug(
            `[${operationType.toUpperCase()}] ${fieldName} - ${
              Date.now() - start
            }ms`,
          ),
        ),
      );
  }
}
