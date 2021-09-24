import { SignUpDto } from './dto'
import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '../../shared'
import { UserService } from '../user/user.service'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private us: UserService, private readonly jwtService: JwtService) {}

  async signUpWithPassword(input: SignUpDto, ip: string): Promise<User | HttpException> {
    return await this.us.createWithPassword(input, ip)
  }

  // async signUp(input: NewUserCredentialsInput): Promise<User | HttpException> {
  //   try {
  //     const { password, ...rest } = input
  //     const db_verification_code = this.app.totGenerator()
  //     const user = await this.us.findUserByEmail({ email_address: input.email_address })

  //     if (user)
  //       throw new HttpException('There is already an account registered with this e-mail address.', HttpStatus.CONFLICT)

  //     const { hashed, salt } = await this.app.hashPassword(password)

  //     const created = await this.us.newUserCredentials({
  //       ...rest,
  //       password_salt: salt.toString(),
  //       password: hashed,
  //       verification_code: db_verification_code,
  //     })
  //     if (created) {
  //       await this.app.deleteIfNotActivated(created.id)
  //       return created
  //     }
  //   } catch (error) {
  //     return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }

  // async signIn(input: LoginUserInput): Promise<User | HttpException> {
  //   try {
  //     const { password, email_address } = input
  //     const user = await this.us.findUserByEmail({ email_address })

  //     if (!user)
  //       throw new HttpException(
  //         'There is no account registered with this email address, please create one to proceed.',
  //         HttpStatus.NOT_FOUND
  //       )

  //     const matching_pwd = await this.app.checkPassword(user.password, password)
  //     if (!matching_pwd) throw new HttpException('Incorrect password, please try again.', HttpStatus.FORBIDDEN)

  //     return user
  //   } catch (error) {
  //     return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }

  generateJwtToken(data: Partial<User>): { access_token: string } {
    const payload: JwtPayload = {
      id: data.id,
      is_admin: data.is_admin,
      is_verified: data.is_verified,
      email_address: data.email_address,
    }
    const access_token = this.jwtService.sign(payload)
    return { access_token }
  }
}
