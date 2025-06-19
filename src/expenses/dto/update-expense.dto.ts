import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updateExpenseDto {
  @IsNotEmpty()
  @IsString()
  category?: string;

  @IsNotEmpty()
  @IsString()
  productName?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity?: number;

  @IsNotEmpty()
  @IsNumber()
  price?: number;
}
