import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateProfileInput {
  @IsNotEmpty()
  @IsString()
  profile_id: string

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

export class UpdateProfilePasswordInput {
  @IsNotEmpty()
  @IsString()
  profile_id: string

  @IsNotEmpty()
  @IsString()
  password: string
}
