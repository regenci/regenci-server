import { sign } from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import { hash, verify } from 'argon2'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CryptographerService {
  public async hashPassword(password: string) {
    const salt = randomBytes(32)
    const hashed = await hash(password, { salt })
    return { salt, hashed }
  }

  public async checkPassword(db_password: string, received_password: string): Promise<boolean> {
    return await verify(db_password, received_password)
  }

  public async jwtSign(data: any, secret: string, time: string): Promise<string> {
    const signed = sign(data, secret, {
      expiresIn: time,
    })
    return `Bearer ${signed}`
  }

  public totGenerator(): number {
    return Math.floor(100000 + Math.random() * 900000)
  }
}
