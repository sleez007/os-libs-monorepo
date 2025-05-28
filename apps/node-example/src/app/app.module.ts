import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TiktokModule } from './tiktok/tiktok.module';

@Module({
  imports: [TiktokModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
