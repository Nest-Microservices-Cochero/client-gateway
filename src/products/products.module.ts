import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'config';

@Module({
  controllers: [ProductsController],
  providers: [],

  //- hay muchos lugares donde hacer esta inyección pero la haremos aca en la carpeta de products
  /// Se hace en la parte de los imports
  imports: [
    ClientsModule.register([
      ///1 esto es un token de inyección que nos va permitir conectarnos des nuestros controladores y demás
      {
        name: PRODUCT_SERVICE,
        ///2 Tienes que poner el mismo canal de comunicación allá en producto pusimos TCP
        transport: Transport.TCP,
        /// 3 el host y el puerto donde esta nuestro servicio, cuando se despliegue esto cambia por eso variables
        options: {
          host: envs.productsMicroserviceHost,
          //- esto tiene que ser numérico
          port: envs.productsMicroservicePort,
        },
      },
    ]),
  ],
})
export class ProductsModule {}
