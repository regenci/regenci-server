import { IsEmail, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator'

export class NewUserCredentialsInput {
  @IsNotEmpty()
  @IsEmail()
  email_address: string

  @IsNotEmpty()
  @IsString()
  first_name: string

  @IsNotEmpty()
  @IsString()
  last_name: string

  @IsNotEmpty()
  @IsString()
  password: string
}
export class NewUserCredentialsDTO extends NewUserCredentialsInput {
  @IsNotEmpty()
  @IsNumber()
  verification_code: number

  @IsNotEmpty()
  @IsString()
  password_salt: string
}
export class NewUserProviderInput {
  @IsNotEmpty()
  @IsEmail()
  email_address: string

  @IsNotEmpty()
  @IsString()
  first_name: string

  @IsNotEmpty()
  @IsString()
  last_name: string

  @IsNotEmpty()
  @IsString()
  profile_picture: string

  @IsNotEmpty()
  @IsString()
  provider_id: string

  @IsNotEmpty()
  @ValidateIf((o) => o.provider_name === 'google')
  provider_name: 'google'
}

export class ActivateAccountInput {
  @IsNotEmpty()
  @IsNumber()
  verification_code: number

  @IsNotEmpty()
  @IsString()
  decription_key: string
}
