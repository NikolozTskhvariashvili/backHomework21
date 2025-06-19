import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsNumber()
  phoneNumber?: number;

  @IsNotEmpty()
  @IsString()
  gender?: string;
}
