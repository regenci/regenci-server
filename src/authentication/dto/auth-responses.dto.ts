import { JwtPayload } from '../../typings/jwt';

export class AuthResponseDto {
  user: JwtPayload;
  accessToken: string;
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  user: JwtPayload;
  accessToken: string;
}
