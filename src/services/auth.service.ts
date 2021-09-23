import config from '../config'
import { User } from '@prisma/client'
import { UserService } from './user.service'
import { CryptographerService } from './index'
import { LoginUserInput, NewUserCredentialsInput } from '../DTO/user'
import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    private us: UserService,
    @Inject(forwardRef(() => CryptographerService)) private crypt: CryptographerService
  ) {}

  async signUp(input: NewUserCredentialsInput): Promise<User | HttpException> {
    try {
      const { password, ...rest } = input
      const db_verification_code = this.crypt.totGenerator()
      const user = await this.us.findUserByEmail({ email_address: input.email_address })

      if (user)
        throw new HttpException('There is already an account registered with this e-mail address.', HttpStatus.CONFLICT)

      const { hashed, salt } = await this.crypt.hashPassword(password)

      return await this.us.newUserCredentials({
        ...rest,
        password_salt: salt.toString(),
        password: hashed,
        verification_code: db_verification_code,
      })
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async signIn(input: LoginUserInput): Promise<User | HttpException> {
    try {
      const { password, email_address } = input
      const user = await this.us.findUserByEmail({ email_address })

      if (!user)
        throw new HttpException(
          'There is no account registered with this email address, please create one to proceed.',
          HttpStatus.NOT_FOUND
        )

      const profile = await this.us.findProfileById({ id: user.profile_id })
      const matching_pwd = await this.crypt.checkPassword(profile.password, password)
      if (!matching_pwd) throw new HttpException('Incorrect password, please try again.', HttpStatus.FORBIDDEN)

      return user
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async createToken(user: User) {
    return {
      expires_in: '1h',
      access_token: await this.crypt.jwtSign({ user_id: user.id }, config().secrets.signin, '1h'),
    }
  }
}
