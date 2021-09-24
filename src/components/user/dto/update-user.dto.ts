import { SignInDto } from '../../auth'
import { SecurityLogActionTypes } from '@prisma/client'
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdatePasswordInput {
  @IsNotEmpty()
  @IsString()
  password: string
}

export class UpdateUserDto extends SignInDto {
  @IsNotEmpty()
  @IsNumber()
  verification_code: number

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean

  @IsOptional()
  @IsString()
  profile_picture?: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name?: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name?: string
}

export class SecurityLogDto {
  @IsNotEmpty()
  @IsDate()
  action_date: Date

  @IsNotEmpty()
  @IsString()
  action_type: SecurityLogActionTypes

  @IsNotEmpty()
  @IsString()
  action_ip_address: string

  @IsNotEmpty()
  @IsString()
  action_city: string

  @IsNotEmpty()
  @IsString()
  action_country: string
}
