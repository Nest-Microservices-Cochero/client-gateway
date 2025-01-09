import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE, PRODUCT_SERVICE } from 'config';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],

  imports: [
    /// Aca solo importamos el nats module y ya
    NatsModule
/*     ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {

          servers: envs.natsServers
        },
      },
    ]), */
  ],
})
export class ProductsModule {}
