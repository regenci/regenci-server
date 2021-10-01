import { User } from '.prisma/client'
import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    const user = await this.usersService.findOne({ email })

    if (!user || !argon2.verify(user.password, pass)) return null

    // extract password from result
    const { password, ...result } = user
    return result
  }

  async login({ id, email }: User) {
    return {
      access_token: this.jwtService.sign({ id, email }),
    }
  }
}
