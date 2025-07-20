import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InstagramAuthService } from './instagram-auth.service';
import { InstagramPublishService } from './instagram-publish.service';
import {
  RedirectParam,
  CreateContainerParam,
  CreateCarouselContainerParam,
} from '@innovatespace/ig-business';

@Controller('instagram')
export class InstagramController {
  constructor(
    private readonly instagramAuthService: InstagramAuthService,
    private readonly instagramPublishService: InstagramPublishService
  ) {}

  @Post()
  getRedirectUri(@Body() body: RedirectParam) {
    console.log('hello', body);
    return this.instagramAuthService.getRedirectUri(body);
  }

  @Get('short-lived')
  getShortLivedInstagramAccessToken(
    @Query()
    {
      code,
      state,
      redirectUri,
    }: {
      code: string;
      state: string;
      redirectUri: string;
    }
  ) {
    console.log('code is', code);
    console.log('state is', state); //use this where you need
    return this.instagramAuthService.getShortLivedInstagramAccessToken(
      code,
      redirectUri
    );
  }

  @Get('long-lived')
  getLongLivedInstagramAccessToken(
    @Query()
    { shortLivedAccessToken }: { shortLivedAccessToken: string }
  ) {
    return this.instagramAuthService.getLongLivedInstagramAccessToken(
      shortLivedAccessToken
    );
  }

  @Get('refresh')
  refreshInstagramAccessToken(
    @Query()
    { longLivedAccessToken }: { longLivedAccessToken: string }
  ) {
    return this.instagramAuthService.refreshInstagramAccessToken(
      longLivedAccessToken
    );
  }

  @Post('create')
  createContainer(@Body() body: CreateContainerParam) {
    return this.instagramPublishService.createContainer(body);
  }

  @Post('create-carousel')
  createCarouselContainer(@Body() body: CreateCarouselContainerParam) {
    return this.instagramPublishService.createCarouselContainer(body);
  }

  @Post('publish')
  publishContainer(@Body() { containerId }: { containerId: string }) {
    return this.instagramPublishService.publishContainer(containerId);
  }
}
