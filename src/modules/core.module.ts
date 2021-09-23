import config from '../config'
import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { AuthModule, UserModule } from '.'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ScheduleModule.forRoot(),
    forwardRef(() => UserModule),
    AuthModule,
  ],
  controllers: [],
  exports: [],
})
export class CoreModule {}
// PassportModule,
//     JwtModule.register({ secret: config().secrets.jwtModule, signOptions: { expiresIn: '60s' } }),
