import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class FindByIdInput {
  @IsNotEmpty()
  @IsString()
  id: string
}

export class FindByEmailInput {
  @IsNotEmpty()
  @IsEmail()
  email_address: string
}
