import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { envs, ORDERS_SERVICE } from 'config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      {
        name: ORDERS_SERVICE,
        transport: Transport.TCP,
        options: {
          //host: envs.orderMicroserviceHost,
          //port: envs.orderMicroservicePort,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
