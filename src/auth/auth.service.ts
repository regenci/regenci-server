import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from './security.service';
import { AuthResponse, SignInDto, SignUpDto } from './dto';
import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private securityService: SecurityService
  ) {}

  async signIn(input: SignInDto): Promise<AuthResponse> {
    const user = await this.userService.findUserByEmail(input.email_address);

    if (!user) {
      throw new NotFoundException(
        'There is no account registered with this email address, please create one to proceed.'
      );
    }

    const matching_pwd = await this.securityService.verify(user.password, input.password);

    if (!matching_pwd) {
      throw new ForbiddenException('Incorrect password, please try again.');
    }

    return {
      token: this.jwtService.sign({
        email_address: input.email_address,
      }),
      user,
    };
  }

  async signUp(input: SignUpDto): Promise<AuthResponse> {
    const { password, ...rest } = input;
    const exist = await this.userService.findUserByEmail(rest.email_address);

    if (exist) {
      throw new ConflictException('There is already an account registered with this e-mail address.');
    }

    const verification_code = this.securityService.generateOTP();
    const hashed = await this.securityService.hash(password);

    const user = await this.userService.createUser({
      ...rest,
      password: hashed,
      verification_code: verification_code,
    });

    delete user.password;

    return {
      token: this.jwtService.sign({ email_address: user.email_address }),
      user,
    };
  }
}
