import { Account, Prisma } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.AccountWhereUniqueInput): Promise<Account | null> {
    return this.prisma.account.findUnique({ where })
  }

  async accounts(params: {
    skip?: number
    take?: number
    cursor?: Prisma.AccountWhereUniqueInput
    where?: Prisma.AccountWhereInput
    orderBy?: Prisma.AccountOrderByWithRelationInput
  }): Promise<Account[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.account.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async createAccount(data: Prisma.AccountCreateInput): Promise<Account> {
    data.password = await argon2.hash(data.password)

    return this.prisma.account.create({
      data: { ...data, User: { create: {} } },
    })
  }

  async updateAccount(params: {
    where: Prisma.AccountWhereUniqueInput
    data: Prisma.AccountUpdateInput
  }): Promise<Account> {
    const { where, data } = params
    return this.prisma.account.update({
      data,
      where,
    })
  }

  async deleteAccount(where: Prisma.AccountWhereUniqueInput): Promise<Account> {
    return this.prisma.account.delete({
      where,
    })
  }
}
