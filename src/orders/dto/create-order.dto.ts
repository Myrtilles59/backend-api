import { IsArray, IsDateString, IsEnum,  IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReservationStatus } from '../enums/reservation-statuts.enum';

export class OrderItemDTO {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class CreateReservationDto {
  @IsDateString()
  date: string;

  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @IsInt()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  products: OrderItemDTO[];
}
