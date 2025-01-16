import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'config';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    /// Capturar error con el pipe
    //
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error); 
      })
    );
  }

  @Post('login')
  /// Definir como recibe la info
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto);
  }

  @Get('verify')
  verifyUser() {
    return this.client.send('auth.verify.user', {});
  }
}
