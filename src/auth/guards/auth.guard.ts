import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
/// 1 No necesitamos esto
//import { JwtService } from '@nestjs/jwt';
//import { jwtConstants } from './constants';
import { Request } from 'express';
import { NATS_SERVICE } from '../../../config/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  /// 1 Inyectamos el servicio de NATS para comunicar esa verificación
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {

      /// 2.1 Aquí se debería hacer la verificación del token, hacemos un envió con el token de payload
      const {user, token: newToken} = await firstValueFrom(
        this.client.send('auth.verify.user', token),
      )
    
      ///
      request['user'] = user
      ///
      request['token'] = newToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // aca corta el token y genera un array con dos valores
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
