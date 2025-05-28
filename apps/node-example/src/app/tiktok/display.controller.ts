import { Body, Controller, Post } from '@nestjs/common';
import { TiktokService } from './tiktok.service';
import type {
  fieldOption,
  ListVideoParam,
  QueryVideoParam,
  VideoFieldOption,
} from '@innovate/tiktok';

@Controller('display')
export class DisplayController {
  constructor(private readonly tiktokService: TiktokService) {}

  @Post('user-data')
  getUserData(@Body() body: { token: string; fields?: fieldOption[] }) {
    return this.tiktokService.getUserData(body.token, body?.fields);
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
    return this.tiktokService.listVideos(body.token, body.filter, body?.fields);
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
    return this.tiktokService.queryVideos(
      body.token,
      body.filter,
      body?.fields
    );
  }
}
