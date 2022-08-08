import { IsString, IsOptional } from 'class-validator';

export class RecommendProducts {
  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  brand: string;
}
