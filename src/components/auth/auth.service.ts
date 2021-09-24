import { User } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from '../../shared'
import { UserService } from '../user/user.service'
import { Injectable, HttpException } from '@nestjs/common'
import { SignUpDto, SignInDto, ForgotPasswordDto } from './dto'

@Injectable()
export class AuthService {
  constructor(private us: UserService, private readonly jwtService: JwtService) {}

  async signUpWithPassword(input: SignUpDto, ip: string): Promise<User | HttpException> {
    return await this.us.createWithPassword(input, ip)
  }

  async signInWithPassword(input: SignInDto, ip: string): Promise<User | HttpException> {
    return await this.us.loginWithPassword(input, ip)
  }

  async forgotPassword(input: ForgotPasswordDto, ip: string) {
    return await this.us.forgotPassword(input, ip)
  }

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
