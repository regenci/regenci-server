import { config } from '../config';
import { UserModule } from '../user';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { SecurityService } from './security.service';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config().jwt.accessToken,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, SecurityService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
