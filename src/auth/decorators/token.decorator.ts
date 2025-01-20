

/// Creo que es mejor hacer sin el CLI

import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();


    /// 1, token se puede tomar de los header, pero recuerda que con el guard en el request ya lo agregamos
    if( !request.token ) {
        throw new InternalServerErrorException('Token not found in the request');
    }
    
    return request.token;
  },
);
