import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'config';

//- La carpeta la renombramos a transport por que se pueden definir otros como de rabbit y asi
@Module({
  /// Se ve duplicado pero asi es para que pueda dar
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natsServers,
        },
      },
    ]),
  ],
})
export class NatsModule {}
