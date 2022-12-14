import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  IsInt,
  MaxLength,
} from 'class-validator';

export class UpdateProductsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value))
  @Min(10000, { message: 'Number min 10000 ' })
  @Max(1000000000, { message: 'Number max 1000000000' })
  price: number;

  @IsString()
  @MaxLength(500, { message: 'Must be at least 500 characters' })
  description: string;

  poisitions: [];
}
