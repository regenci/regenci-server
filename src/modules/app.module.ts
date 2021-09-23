import { CoreModule } from './index'
import { forwardRef, Module } from '@nestjs/common'
import { AppController } from '../controllers'
import { AppService, PrismaService } from '../services'

@Module({
  imports: [forwardRef(() => CoreModule)],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
