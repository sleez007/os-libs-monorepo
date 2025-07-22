import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramAuthService } from './instagram-auth.service';
import { InstagramPublishService } from './instagram-publish.service';
import { InstagramAccountService } from './instagram-account.service';

@Module({
  controllers: [InstagramController],
  providers: [
    InstagramAuthService,
    InstagramPublishService,
    InstagramAccountService,
  ],
})
export class InstagramModule {}
