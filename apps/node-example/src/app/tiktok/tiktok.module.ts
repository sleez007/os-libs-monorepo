import { Module } from '@nestjs/common';
import { PublishController } from './publish.controller';
import { AuthController } from './auth.controller';
import { DisplayController } from './display.controller';
import { TiktokService } from './tiktok.service';

@Module({
  controllers: [PublishController, AuthController, DisplayController],
  providers: [TiktokService],
})
export class TiktokModule {}
