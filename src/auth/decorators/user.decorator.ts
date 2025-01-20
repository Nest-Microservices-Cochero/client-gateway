

/// Creo que es mejor hacer sin el CLI

import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();


    /// 1
    if( !request.user ) {
        throw new InternalServerErrorException('User not found in the request');
    }
    
    return request.user;
  },
);
