import { User } from '@prisma/client'
import { UserService } from './user.service'
import { CryptographerService } from './index'
import { LoginUserInput, NewUserCredentialsInput } from '../DTO/user'
import {
  Injectable,
  HttpException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private us: UserService, private crypt: CryptographerService) {}

  public async signUp(input: NewUserCredentialsInput): Promise<User | HttpException> {
    try {
      const { password, ...rest } = input
      const db_verification_code = this.crypt.totGenerator()
      const user = await this.us.findUserByEmail({ email_address: input.email_address })

      if (user) throw new ConflictException('There is already an account registered with this e-mail address.')

      const { hashed, salt } = await this.crypt.hashPassword(password)

      return this.us.newUserCredentials({
        ...rest,
        password_salt: salt.toString(),
        password: hashed,
        verification_code: db_verification_code,
      })
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
  public async signIn(input: LoginUserInput): Promise<User | HttpException> {
    try {
      const { password, email_address } = input
      const user = await this.us.findUserByEmail({ email_address })

      if (!user)
        throw new NotFoundException(
          'There is no account registered with this email address, please create one to proceed.'
        )

      const profile = await this.us.findProfileById({ id: user.profile_id })
      const matching_pwd = await this.crypt.checkPassword(profile.password, password)
      if (!matching_pwd) throw new ForbiddenException('Incorrect password, please try again.')

      return user
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }
}
