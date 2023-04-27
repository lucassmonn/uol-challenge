import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx).getContext();
    const user = context.req.user;
    return user;
  },
);
