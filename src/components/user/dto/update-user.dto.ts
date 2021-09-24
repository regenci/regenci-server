import { IsNotEmpty, IsString } from 'class-validator'

export class UpdatePasswordInput {
  @IsNotEmpty()
  @IsString()
  password: string
}

// export class UpdateUserInput {
//   @IsOptional()
//   @IsString()
//   @MinLength(4)
//   @MaxLength(20)
//   username?: string

//   @IsOptional()
//   @IsEmail()
//   email?: string

//   @IsOptional()
//   @IsBoolean()
//   isActive?: boolean

//   @IsRequiredWith(['newPassword'])
//   @IsOptional()
//   @IsString()
//   oldPassword?: string

//   @IsRequiredWith(['oldPassword'])
//   @IsOptional()
//   @IsStrongPassword()
//   newPassword?: string
// }
