import { config } from '../config';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RequestWithUser } from '../typings/request';
import { SecurityService } from './security.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { AuthResponseDto, RefreshTokenResponseDto, SignUpDto } from './dto';
import {
  Get,
  Req,
  Res,
  Post,
  Body,
  UseGuards,
  Controller,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService, private securityService: SecurityService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Res({ passthrough: true }) res: Response, @Req() req: RequestWithUser) {
    try {
      const accessToken = await this.securityService.generateAccessToken(req.user);
      const refreshToken = await this.securityService.generateRefreshToken(req.user, 60 * 60 * 24 * 30);
      const loginUserResponse = new AuthResponseDto();

      loginUserResponse.user = {
        id: req.user.id,
        is_admin: req.user.is_admin,
        is_verified: req.user.is_verified,
        email_address: req.user.email_address,
      };

      loginUserResponse.accessToken = accessToken;
      loginUserResponse.refreshToken = refreshToken;
      res.cookie(config().jwt.refreshToken, refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/auth/refresh',
      });

      return loginUserResponse;
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  @Post('signup')
  async signup(@Res({ passthrough: true }) res: Response, @Body() input: SignUpDto) {
    try {
      const user = await this.authService.signUp(input);
      if (!user) throw new BadRequestException('Something went wrong while creating the user!');
      const accessToken = await this.securityService.generateAccessToken(user);
      const refreshToken = await this.securityService.generateRefreshToken(user, 60 * 60 * 24 * 30);
      const registerUserResponse = new AuthResponseDto();
      registerUserResponse.user = {
        id: user.id,
        is_admin: user.is_admin,
        is_verified: user.is_verified,
        email_address: user.email_address,
      };
      res.cookie(config().jwt.refreshToken, refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/auth/refresh',
      });
      registerUserResponse.accessToken = accessToken;
      registerUserResponse.refreshToken = refreshToken;
      return registerUserResponse;
    } catch (error) {
      return new InternalServerErrorException(error.message);
    }
  }

  @Post('refresh')
  async refresh(@Req() req: Request): Promise<RefreshTokenResponseDto> {
    const refreshToken = req.cookies['jid'];
    const { user, token } = await this.securityService.createAccessTokenFromRefreshToken(refreshToken);

    const refreshTokenResponse = new RefreshTokenResponseDto();
    refreshTokenResponse.user = {
      id: user.id,
      is_admin: user.is_admin,
      is_verified: user.is_verified,
      email_address: user.email_address,
    };

    refreshTokenResponse.accessToken = token;
    return refreshTokenResponse;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie(config().jwt.refreshToken, '', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('secret')
  async getSecret() {
    return 'This is a secret';
  }
}
