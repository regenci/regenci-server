import { User } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { FindByIdInput, FindByEmailInput } from '../DTO/queries'
import { NewUserCredentialsDTO, NewUserProviderInput } from '../DTO/user'
import { UpdateUserInput, UpdateUserPasswordInput } from '../DTO/profile'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Creates a new user using the specified credentials
  async newUserCredentials(input: NewUserCredentialsDTO) {
    return await this.prisma.user.create({
      data: {
        ...input,
      },
    })
  }

  // Creates a new account using the provider
  async newUserProvider(input: NewUserProviderInput): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...input,
      },
    })
  }

  // If theres an account registered with credentials, then update profile values
  async existingUserProvider(input: NewUserProviderInput): Promise<User> {
    const { email_address, ...rest } = input
    return await this.prisma.user.update({
      where: { email_address },
      data: { ...rest },
    })
  }

  // Return an array of all the users
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany()
  }

  // Return the number of users in the DB
  async getTotalUsersCount(): Promise<number> {
    return await this.prisma.user.count()
  }

  // Returns the user with the provided id
  async findUserById(input: FindByIdInput): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: input.id },
    })
  }

  async findUserByEmail(input: FindByEmailInput): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email_address: input.email_address },
    })
  }

  async updateUserById(input: UpdateUserInput): Promise<User> {
    const { user_id, ...rest } = input
    return await this.prisma.user.update({
      where: { id: user_id },
      data: {
        ...rest,
      },
    })
  }

  async updateProfilePasswordById(input: UpdateUserPasswordInput): Promise<User> {
    const { user_id, ...rest } = input
    return await this.prisma.user.update({
      where: { id: user_id },
      data: {
        ...rest,
      },
    })
  }
}
