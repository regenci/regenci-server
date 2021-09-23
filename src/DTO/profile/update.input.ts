import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserInput {
  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsNotEmpty()
  @IsString()
  first_name?: string

  @IsNotEmpty()
  @IsString()
  last_name?: string

  @IsNotEmpty()
  @IsString()
  profile_picture?: string
}

export class UpdateUserPasswordInput {
  @IsNotEmpty()
  @IsString()
  user_id: string

  @IsNotEmpty()
  @IsString()
  password: string
}
