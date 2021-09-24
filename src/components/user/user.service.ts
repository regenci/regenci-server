import { ForgotPasswordDto, SignInDto, SignUpDto } from '../auth'
import { User } from '@prisma/client'
import { CreateUserCredentialsDto, SecurityLogDto, UpdateUserDto } from './dto'
import { checkPassword, hashPassword } from './password.transformer'
import { totGenerator, UserLogCreator } from './helpers'
import { PrismaService } from '../../services/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EmailService } from '../email'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private config: ConfigService, private email: EmailService) {}

  // Creates a new user using the specified credentials
  async createWithPassword(input: SignUpDto, ip: string): Promise<User | HttpException> {
    try {
      const { password, ...rest } = input
      const exist = await this.findUserByEmail(rest.email_address)

      if (exist)
        throw new HttpException('There is already an account registered with this e-mail address.', HttpStatus.CONFLICT)

      const verification_code = totGenerator()
      const { hashed, salt } = await hashPassword(password)

      const data: CreateUserCredentialsDto = {
        ...rest,
        verification_code: verification_code,
        password: hashed,
        password_salt: salt.toString(),
        security_logs: [await UserLogCreator('signup', ip)],
      }

      return await this.prisma.user.create({
        data: {
          ...data,
        },
      })
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async loginWithPassword(input: SignInDto, ip: string): Promise<User | HttpException> {
    try {
      const user = await this.findUserByEmail(input.email_address)
      if (!user)
        throw new HttpException(
          'There is no account registered with this email address, please create one to proceed.',
          HttpStatus.NOT_FOUND
        )

      const matching_pwd = await checkPassword(user.password, input.password)
      if (!matching_pwd) throw new HttpException('Incorrect password, please try again.', HttpStatus.FORBIDDEN)

      const updated = await this.updateUserLogsById(user.id, await UserLogCreator('login', ip))

      if (!updated) throw new HttpException('Could not set the security log.', HttpStatus.FORBIDDEN)
      return user
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async forgotPassword(input: ForgotPasswordDto, ip: string) {
    try {
      const user = await this.findUserByEmail(input.email_address)
      const main_verification_code = totGenerator()
      if (!user)
        throw new HttpException(
          'There is no account registered with this email address, please create one to proceed.',
          HttpStatus.NOT_FOUND
        )

      if (!user.is_verified)
        throw new HttpException(
          'Your account is not activated, please activate it and try again.',
          HttpStatus.NOT_ACCEPTABLE
        )

      const packet = {
        from: this.config.get('email.from.reset'),
        to: input.email_address,
        templateId: this.config.get('email.templates.reset'),
        dynamicTemplateData: {
          main_verification_code,
          current_year: new Date().getFullYear(),
        },
      }
      const updated = await this.updateUserLogsById(user.id, await UserLogCreator('forgot_password', ip))
      if (!updated) throw new HttpException('Could not set the security log.', HttpStatus.FORBIDDEN)

      const sent = await this.email.send(packet)
      if (!sent) throw new HttpException('Could not send the email', HttpStatus.CONFLICT)
      return user
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Creates a new account using the provider
  // async newUserProvider(input: NewUserProviderInput): Promise<User> {
  //   return await this.prisma.user.create({
  //     data: {
  //       ...input,
  //     },
  //   })
  // }

  // // If theres an account registered with credentials, then update profile values
  // async existingUserProvider(input: NewUserProviderInput): Promise<User> {
  //   const { email_address, ...rest } = input
  //   return await this.prisma.user.update({
  //     where: { email_address },
  //     data: { ...rest },
  //   })
  // }

  // Return an array of all the users
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  // Return the number of users in the DB
  async getTotalUsersCount(): Promise<number> {
    return await this.prisma.user.count()
  }

  // Returns the user with the provided id
  async findUserById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findUserByEmail(email_address: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email_address },
    })
  }

  async updateUserById(id: string, input: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...input,
      },
    })
  }
  async updateUserLogsById(id: string, input: SecurityLogDto): Promise<User> {
    const logs = await this.prisma.user.findUnique({
      select: { security_logs: true },
      where: { id },
    })
    return await this.prisma.user.update({
      where: { id },
      data: {
        security_logs: {
          set: Array.from(new Set([...logs.security_logs, input])) as any,
        },
      },
    })
  }

  // async updateUserById(input: UpdateUserInput): Promise<User> {
  //   const { user_id, ...rest } = input
  //   return await this.prisma.user.update({
  //     where: { id: user_id },
  //     data: {
  //       ...rest,
  //     },
  //   })
  // }

  // async updateProfilePasswordById(input: UpdateUserPasswordInput): Promise<User> {
  //   const { user_id, ...rest } = input
  //   return await this.prisma.user.update({
  //     where: { id: user_id },
  //     data: {
  //       ...rest,
  //     },
  //   })
  // }
}
