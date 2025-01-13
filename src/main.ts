import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';
import { envs } from 'config';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /// Agregarlo
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port ?? 3000);

  logger.log(
    `Microservicios Gateway corriendo en el puerto ${envs.port ?? 3000}`,
  );

  console.log('Hola Mundo Primer commit')
}
bootstrap();
