import { UserService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from './security.service';
import { AuthResponse, SignInDto, SignUpDto, VerifyAccountDto } from './dto';
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

    if (!user.is_verified) {
      throw new ForbiddenException('Your account is not verified, please verify it first!');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({
        id: user.id,
        email_address: input.email_address,
      }),
      user,
    };
  }

  async signUp(input: SignUpDto): Promise<Pick<AuthResponse, 'token'>> {
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
      token: this.jwtService.sign({
        id: user.id,
        email_address: input.email_address,
      }),
    };
  }

  async verifyAccount(input: VerifyAccountDto): Promise<AuthResponse> {
    const user = await this.userService.findUserById(input.id);

    if (!user) {
      throw new NotFoundException(
        'There is no account registered with this email address, please create one to proceed.'
      );
    }

    const matchingCode = user.verification_code === input.code;

    if (user.verification_code === 1) {
      throw new ForbiddenException('Your account is already verified.');
    }

    if (!matchingCode) {
      throw new ForbiddenException('Incorrect verification code, please try again.');
    }

    const updated = await this.userService.updateUserById(input.id, {
      is_verified: true,
      verification_code: 1,
    });
    delete updated.password;
    return {
      token: this.jwtService.sign({ email_address: user.email_address }),
      user: updated,
    };
  }
}
