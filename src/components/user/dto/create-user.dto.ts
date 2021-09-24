import { SignUpDto } from '../../auth/dto'
import { LogActionTypes } from '@prisma/client'
import { IsRequiredWith } from '../../../shared'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateUserCredentialsDto extends SignUpDto {
  @IsNotEmpty()
  @IsRequiredWith(['password'])
  password_salt: string

  @IsNotEmpty()
  @IsNumber()
  verification_code: number

  logs: {
    action_date: Date
    action_type: LogActionTypes
    action_ip_address: string
    action_city: string
    action_country: string
  }
}
