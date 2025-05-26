import { Injectable } from '@nestjs/common';
import {
  OAuthTicTok,
  DisplayTicTok,
  fieldOption,
  ListVideoParam,
  QueryVideoParam,
  RefreshTokenParam,
  VideoFieldOption,
  RevokeTokenParam,
} from '@innovate/tiktok';

const oauth = new OAuthTicTok(
  'sbawi6n2vle3t1j9th',
  'Mhg1IHJ46dyrW7EVI8d5l7yry8oDdsbn'
);

@Injectable()
export class AppService {
  refreshToken(body: RefreshTokenParam) {
    return oauth.refreshToken(body);
  }

  revokeToken(body: RevokeTokenParam) {
    return oauth.revokeToken(body);
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getUserData(token: string, query?: fieldOption[]) {
    console.log(token);
    const display = new DisplayTicTok(token);
    return display.userInfo(query);
  }

  listVideos(
    token: string,
    filter: ListVideoParam,
    fields?: VideoFieldOption[]
  ) {
    const display = new DisplayTicTok(token);
    return display.listVideo(filter, fields);
  }

  queryVideos(
    token: string,
    filter: QueryVideoParam,
    fields?: VideoFieldOption[]
  ) {
    const display = new DisplayTicTok(token);
    return display.queryVideo(filter, fields);
  }
}
