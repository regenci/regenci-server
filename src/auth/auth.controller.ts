import { AuthGuard } from './guards';
import { UserService } from '../user';
import { User } from '@prisma/client';
import { AuthUser } from './decorators';
import { AuthService } from './auth.service';
import { VerifyGuard } from './guards/verify.guard';
import { Get, Post, Body, UseGuards, Controller } from '@nestjs/common';
import { AuthResponse, SignInDto, SignUpDto, VerifyAccountDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  // @UseGuards(AuthGuard)
  @Post('login')
  login(@Body() input: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(input);
  }

  @Post('register')
  register(@Body() input: SignUpDto): Promise<Pick<AuthResponse, 'token'>> {
    return this.authService.signUp(input);
  }

  @UseGuards(VerifyGuard)
  @Post('verify')
  verify(@Body() input: VerifyAccountDto): Promise<AuthResponse> {
    return this.authService.verifyAccount(input);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
