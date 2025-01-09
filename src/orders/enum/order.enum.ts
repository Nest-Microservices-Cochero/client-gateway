

/// Como no podemos importar el prima cliente podemos crear el enum por aca
export enum OrderStatus {
   PENDING = 'PENDING',
   SHIPPED = 'SHIPPED',
   DELIVERED = 'DELIVERED',
   CANCELLED = 'CANCELLED',
}
/// Aca lo que estamos haciendo es un arreglo para centralizar todos los posibles estados de una orden
export const OrderStatusList = [
    OrderStatus.CANCELLED,
    OrderStatus.DELIVERED,
    OrderStatus.PENDING,
    OrderStatus.SHIPPED,
]