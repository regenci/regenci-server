import { User } from '@prisma/client';
import { PrismaService } from '../prisma';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../authentication/dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(input: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: { ...input } });
  }

  // Returns the user with the provided id
  async findUserById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Returns the user with the provided email address
  async findUserByEmail(email_address: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email_address },
    });
  }
}
