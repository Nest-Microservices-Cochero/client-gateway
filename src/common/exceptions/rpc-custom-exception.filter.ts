import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const rpcError = exception.getError();

    console.log('RpcCustomExceptionFilter error de ms algo 2 nnnnn', rpcError);

    ///1) Aca vemos si el error es porque es servicio no esta disponible y respondemos
    //- este error no debería de suceder podemos poner un timo de alerta para notificar esto ejemplo email
    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError['status'];

      return response.status(status).json(rpcError);
    }

    response.status(400).json({
      //- cambie a para manejarlo igual
      status: 400,
      message: rpcError,
    });
  }
}
