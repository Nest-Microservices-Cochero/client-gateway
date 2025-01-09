import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { envs, ORDERS_SERVICE } from 'config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  /// 1) Inyectar el MS
  imports: [
    ClientsModule.register([
      /// 2) Especificar el canal de comunicación al MS y su conexion
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.orderMicroserviceHost,
          port: envs.orderMicroservicePort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
