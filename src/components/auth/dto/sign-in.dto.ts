import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email_address: string

  @IsNotEmpty()
  @IsString()
  password: string
}
