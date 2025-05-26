import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import type {
  fieldOption,
  ListVideoParam,
  QueryVideoParam,
  RefreshTokenParam,
  RevokeTokenParam,
  VideoFieldOption,
} from '@innovate/tiktok';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenParam) {
    return this.appService.refreshToken(body);
  }

  @Post('revoke-token')
  revokeToken(@Body() body: RevokeTokenParam) {
    return this.appService.revokeToken(body);
  }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('display-data')
  getUserData(@Body() body: { token: string; fields?: fieldOption[] }) {
    return this.appService.getUserData(body.token, body?.fields);
  }

  @Post('list-videos')
  listVideos(
    @Body()
    body: {
      token: string;
      filter: ListVideoParam;
      fields?: VideoFieldOption[];
    }
  ) {
    return this.appService.listVideos(body.token, body.filter, body?.fields);
  }

  @Post('query-videos')
  queryVideos(
    @Body()
    body: {
      token: string;
      filter: QueryVideoParam;
      fields?: VideoFieldOption[];
    }
  ) {
    return this.appService.queryVideos(body.token, body.filter, body?.fields);
  }
}
