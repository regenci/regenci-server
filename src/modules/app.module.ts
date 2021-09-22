import { Module } from '@nestjs/common'
import { CoreModule } from './core.module'
import { AppController } from '../controllers'
import { AppService, PrismaService } from '../services'

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
