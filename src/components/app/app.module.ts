import { UserModule } from '../user'
import { EmailModule } from '../email'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../../services'
import { AppController } from './app.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { forwardRef, Module } from '@nestjs/common'
import { appConfig, validationSchema } from '../../config'
import { AuthModule } from '../auth'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig], validationSchema }),
    ScheduleModule.forRoot(),
    EmailModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
