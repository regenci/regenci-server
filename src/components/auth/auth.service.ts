import { Account } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { AccountsService } from '../accounts/accounts.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private accountService: AccountsService, private jwtService: JwtService) {}

  async validateAccount(email: string, pass: string): Promise<Partial<Account>> {
    const account = await this.accountService.findOne({ email })

    if (!account || !argon2.verify(account.password, pass)) return null

    // extract password from result
    const { password, ...result } = account
    return result
  }

  async login({ id, email }: Account) {
    return {
      access_token: this.jwtService.sign({ id, email }, { expiresIn: '1m', secret: process.env.JWT_SECRET }),
      refresh_token: this.jwtService.sign({ id, email }, { expiresIn: '1M', secret: process.env.JWT_REFRESH_SECRET }),
    }
  }
}
