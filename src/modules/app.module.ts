import { Module } from '@nestjs/common'
import { CoreModule } from './core.module'
import { AppController } from '@server/controllers'
import { AppService, PrismaService } from '@server/services'

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
