import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

/// validar con un emun lo que podemos recibir
export class StatusDto {
    @IsOptional()
    @IsEnum( OrderStatusList, {
        message : `Valid status are ${OrderStatusList}`
    })
    status: OrderStatus;
}