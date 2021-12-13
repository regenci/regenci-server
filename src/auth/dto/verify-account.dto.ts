import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyAccountDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
