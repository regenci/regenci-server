import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ForgotPasswordInput {
  @IsNotEmpty()
  @IsEmail()
  email_address: string
}

export class ResetPasswordInput {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsNumber()
  verification_code: number

  @IsNotEmpty()
  @IsNumber()
  main_verification_code: number
}
