import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, PRODUCT_SERVICE } from 'config';

@Module({
  controllers: [ProductsController],
  providers: [],

  imports: [
    ClientsModule.register([
      {
        /// Se conecta al servicio de nats
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {

          /// establecer conexion aca
          servers: envs.natsServers

          ///- Recuerda que en nats no tenemos host y port
          //host: envs.productsMicroserviceHost,
          //port: envs.productsMicroservicePort,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
