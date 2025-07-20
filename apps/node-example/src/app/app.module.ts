import { Module } from '@nestjs/common';
import { TiktokModule } from './tiktok/tiktok.module';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [TiktokModule, InstagramModule],
})
export class AppModule {}
