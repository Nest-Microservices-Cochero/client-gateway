import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

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

  await app.listen(process.env.PORT ?? 3000);

  logger.log(
    `Microservicio Gateway corriendo en el puerto ${process.env.PORT ?? 3000}`,
  );
}
bootstrap();