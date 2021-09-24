import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../../services'
import { AppController } from './app.controller'
import { ScheduleModule } from '@nestjs/schedule'
import { appConfig, validationSchema } from '../../config'

@Module({
  imports: [ConfigModule.forRoot({ load: [appConfig], validationSchema }), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
