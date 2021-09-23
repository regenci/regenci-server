import { Injectable } from '@nestjs/common'
import { User, Profile } from '@prisma/client'
import { PrismaService } from './prisma.service'
import { FindByIdInput, FindByEmailInput } from '../DTO/queries'
import { NewUserCredentialsDTO, NewUserProviderInput } from '../DTO/user'
import { UpdateProfileInput, UpdateProfilePasswordInput } from '../DTO/profile'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Creates a new user using the specified credentials
  async newUserCredentials(input: NewUserCredentialsDTO) {
    return await this.prisma.user.create({
      data: {
        profile: {
          create: {
            ...input,
          },
        },
      },
    })
  }

  // Creates a new account using the provider
  async newUserProvider(input: NewUserProviderInput) {
    return await this.prisma.user.create({
      data: {
        profile: {
          create: {
            ...input,
          },
        },
      },
    })
  }

  // If theres an account registered with credentials, then update profile values
  async existingUserProvider(input: NewUserProviderInput): Promise<Profile> {
    const { email_address, ...rest } = input
    return await this.prisma.profile.update({
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

  async findProfileById(input: FindByIdInput): Promise<Profile> {
    return await this.prisma.profile.findUnique({
      where: { ...input },
    })
  }

  async findUserByEmail(input: FindByEmailInput): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { profile: { ...input } },
    })
  }

  async findProfileByEmail(input: FindByEmailInput): Promise<Profile> {
    return await this.prisma.profile.findUnique({
      where: { ...input },
    })
  }

  async updateProfileById(input: UpdateProfileInput) {
    const { profile_id, ...rest } = input
    return await this.prisma.profile.update({
      where: { id: profile_id },
      data: {
        ...rest,
      },
    })
  }

  async updateProfilePasswordById(input: UpdateProfilePasswordInput) {
    const { profile_id, ...rest } = input
    return await this.prisma.profile.update({
      where: { id: profile_id },
      data: {
        ...rest,
      },
    })
  }
}
