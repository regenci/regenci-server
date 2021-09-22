import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginUserInput {
  @IsNotEmpty()
  @IsEmail()
  email_address: string

  @IsNotEmpty()
  @IsString()
  password: string
}
