import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { NATS_SERVICE, } from 'config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {

  /// Inyectar la conexion con el servidor NATS
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto);
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      return await firstValueFrom(
        this.client.send('findAllOrders', {
          ...paginationDto,
          status: statusDto.status,
        }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await firstValueFrom(
        this.client.send('findOneOrder', { id }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /// Crear el endpoint que se comunica con el micro
  @Patch('status/:id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      return await firstValueFrom(
        this.client.send('changeOrderStatus', { id, ...statusDto }),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
