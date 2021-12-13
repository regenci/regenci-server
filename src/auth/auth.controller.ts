import { User } from '@prisma/client';
import { AuthUser } from './decorators';
import { AuthService } from './auth.service';
import { AuthGuard, LocalAuthGuard } from './guards';
import { AuthResponse, SignInDto, SignUpDto } from './dto';
import { Get, Post, Body, UseGuards, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() input: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(input);
  }

  @Post('register')
  register(@Body() input: SignUpDto): Promise<AuthResponse> {
    return this.authService.signUp(input);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getLoggedUser(@AuthUser() user: User): User {
    return user;
  }
}
