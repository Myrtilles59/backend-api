import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateProductDto {

  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}