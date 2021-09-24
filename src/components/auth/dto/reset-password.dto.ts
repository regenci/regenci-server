import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsNumber()
  verification_code: number
}
