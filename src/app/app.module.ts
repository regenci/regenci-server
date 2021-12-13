import { AuthModule } from '../auth';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, isGlobal: true, envFilePath: '.env' }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
