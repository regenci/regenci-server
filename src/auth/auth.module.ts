import { config } from '../config';
import { UserModule } from '../user';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { SecurityService } from './security.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config().jwt.accessToken,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, SecurityService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
