import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  /// El id lo borramos de aca por que por aca lo recibimos por los parámetros
  /*  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id: number; */
}
