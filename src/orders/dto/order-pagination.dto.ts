import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

/// Extendemos del DTO generar de paginación
export class OrderPaginationDto extends PaginationDto {


    /// Agregamos la opción de obtener un estado de orden para filtrarlas
    @IsOptional()
    @IsEnum( OrderStatusList, {
        message: `Valid status are ${OrderStatusList}`
    })
    status: OrderStatus;
}