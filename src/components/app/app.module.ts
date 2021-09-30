import { UserService } from '../user'
import { EmailModule } from '../email'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../../services'
import { AppController } from './app.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { forwardRef, Module } from '@nestjs/common'
import { appConfig, validationSchema } from '../../config'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig], validationSchema }),
    ScheduleModule.forRoot(),
    forwardRef(() => EmailModule),
  ],
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
})
export class AppModule {}
