import { SignInDto } from './sign-in.dto'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class SignUpDto extends SignInDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  first_name: string

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  last_name: string
}
