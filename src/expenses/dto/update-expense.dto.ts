import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateExpenseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price?: number;
}
