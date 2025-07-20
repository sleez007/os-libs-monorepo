import { Injectable } from '@nestjs/common';
import { OAuthInstagram, RedirectParam } from '@innovatespace/ig-business';

@Injectable()
export class InstagramAuthService {
  private readonly oauthInstagram: OAuthInstagram;
  constructor() {
    console.log(
      'env data is',
      process.env.INSTAGRAM_APP_ID,
      process.env.INSTAGRAM_APP_SECRET
    );
    this.oauthInstagram = new OAuthInstagram(
      process.env.INSTAGRAM_APP_ID,
      process.env.INSTAGRAM_APP_SECRET
    );
  }
  async getRedirectUri(param: RedirectParam) {
    const url = OAuthInstagram.getRedirectUri(param);
    return {
      url,
    };
  }

  async getShortLivedInstagramAccessToken(code: string, redirectUri: string) {
    console.log(
      'code is',
      process.env.INSTAGRAM_APP_ID,
      process.env.INSTAGRAM_APP_SECRET
    );
    return this.oauthInstagram.getShortLivedInstagramAccessToken(
      redirectUri,
      code
    );
  }

  async getLongLivedInstagramAccessToken(shortLivedAccessToken: string) {
    return this.oauthInstagram.getLongLivedInstagramAccessToken(
      shortLivedAccessToken
    );
  }

  async refreshInstagramAccessToken(longLivedAccessToken: string) {
    return this.oauthInstagram.refreshInstagramAccessToken(
      longLivedAccessToken
    );
  }
}
