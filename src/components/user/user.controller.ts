import { User } from '@prisma/client'
import { UserService } from './user.service'
import { ClassSerializerInterceptor, Controller, Get, NotFoundException, Param, UseInterceptors } from '@nestjs/common'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:email_address')
  async getByUsername(@Param('email_address') email_address: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email_address)
    if (user) return user
    throw new NotFoundException()
  }
}
