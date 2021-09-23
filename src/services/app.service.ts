import { sign } from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import { hash, verify } from 'argon2'
import { Timeout } from '@nestjs/schedule'
import { PrismaService } from './prisma.service'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  root(ip: string): string {
    return `Hello, welcome to regenci main server! 
              Some details about you:
              - IP address: ${ip}`
  }

  // This is a cron job that auto deletes a specified account that is not activated after 15 minutes
  @Timeout(10000)
  async deleteIfNotActivated(id: string) {
    try {
      return await this.prisma.user
        .delete({
          where: { id },
        })
        .then(() => console.log('deleted'))
    } catch (error) {
      return new InternalServerErrorException(error.message)
    }
  }

  // This method generates a argon hashed password and returns the salt and the hashed password
  async hashPassword(password: string) {
    const salt = randomBytes(32)
    const hashed = await hash(password, { salt })
    return { salt, hashed }
  }

  // This method verifies if the password stored in the db matches the one provider by the user
  async checkPassword(db_password: string, received_password: string): Promise<boolean> {
    return await verify(db_password, received_password)
  }

  // This method signs a jwt token with the provided secret, data, and expire date
  async jwtSign(data: any, secret: string, time: string): Promise<string> {
    const signed = sign(data, secret, {
      expiresIn: time,
    })
    return `Bearer ${signed}`
  }

  // This method generates a random 6 digit number
  totGenerator(): number {
    return Math.floor(100000 + Math.random() * 900000)
  }
}
