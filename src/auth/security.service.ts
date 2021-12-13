import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../typings/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecurityService {
  constructor(private jwtService: JwtService, private userService: UserService) {}

  async hash(password: string): Promise<string> {
    const salt = randomBytes(32);
    return hash(password, { salt });
  }

  async verify(db_password: string, received_password: string): Promise<boolean> {
    return await verify(db_password, received_password);
  }

  // This method generates a random 6 digit number
  generateOTP(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async generateAccessToken(input: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(input);
  }
}
