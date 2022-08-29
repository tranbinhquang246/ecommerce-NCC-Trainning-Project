import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Min,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class SearchProductDto {
  @ApiPropertyOptional()
  @MaxLength(64)
  @IsOptional()
  searchWord: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  brand: string;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit: number;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page: number;
}
