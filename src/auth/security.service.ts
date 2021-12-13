import { config } from '../config';
import { randomBytes } from 'crypto';
import { hash, verify } from 'argon2';
import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../typings/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';

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

  async generateRefreshToken(input: JwtPayload, expiresIn: number): Promise<string> {
    return await this.jwtService.signAsync(input, {
      secret: config().jwt.refreshToken,
      expiresIn: expiresIn,
    });
  }

  async resolveRefreshToken(refreshToken: string): Promise<{
    user: JwtPayload;
  }> {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: config().jwt.refreshToken,
      });
      if (!payload.id) {
        throw new UnprocessableEntityException('Refresh token malformed');
      }

      const user = await this.userService.findUserById(payload.id);
      if (!user) {
        throw new UnprocessableEntityException('Refresh token malformed');
      }

      return { user };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  async createAccessTokenFromRefreshToken(refresh: string): Promise<{
    user: JwtPayload;
    token: string;
  }> {
    const { user } = await this.resolveRefreshToken(refresh);
    const token = await this.generateAccessToken(user);
    return { user, token };
  }
}
