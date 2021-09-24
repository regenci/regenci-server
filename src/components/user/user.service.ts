import { SignUpDto } from '../auth'
import { User } from '@prisma/client'
import { CreateUserCredentialsDto } from './dto'
import { hashPassword } from './password.transformer'
import { totGenerator, UserLogCreator } from './helpers'
import { PrismaService } from '../../services/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
        logs: { ...(await UserLogCreator('signup', ip)) },
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
