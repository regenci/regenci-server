import { SignUpDto } from '../../auth/dto'
import { IsRequiredWith } from '../../../shared'
import { SecurityLogDto } from './update-user.dto'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateUserCredentialsDto extends SignUpDto {
  @IsNotEmpty()
  @IsRequiredWith(['password'])
  password_salt: string

  @IsNotEmpty()
  @IsNumber()
  verification_code: number

  security_logs: SecurityLogDto[]
}
