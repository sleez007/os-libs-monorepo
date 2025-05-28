/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, Injectable } from '@nestjs/common';
import {
  OAuthTicTok,
  DisplayTicTok,
  fieldOption,
  ListVideoParam,
  QueryVideoParam,
  RefreshTokenParam,
  VideoFieldOption,
  RevokeTokenParam,
  OauthParam,
  ExchangeTokenParam,
  ContentPublishTicTok,
  PostPhotoParam,
  PostVideoParam,
  VideoPostInfo,
  UploadPayload,
} from '@innovate/tiktok';

export interface IUploader {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

const oauth = new OAuthTicTok(
  'sbawi6n2vle3t1j9th',
  'Mhg1IHJ46dyrW7EVI8d5l7yry8oDdsbn'
);

@Injectable()
export class TiktokService {
  // AUTH RELATED FUNCTIONALITY
  async refreshToken(body: RefreshTokenParam) {
    try {
      return await oauth.refreshToken(body);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async revokeToken(body: RevokeTokenParam) {
    try {
      return await oauth.revokeToken(body);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async oauth(body: OauthParam) {
    try {
      return await oauth.getRedirectUri(body);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async exchangeCodeForToken(body: ExchangeTokenParam) {
    try {
      return await oauth.exchangeCodeForToken(body);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  // DISPLAY RELATED FUNCTIONALITY

  async getUserData(token: string, query?: fieldOption[]) {
    try {
      const display = new DisplayTicTok(token);
      return await display.userInfo(query);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async listVideos(
    token: string,
    filter: ListVideoParam,
    fields?: VideoFieldOption[]
  ) {
    try {
      const display = new DisplayTicTok(token);
      return await display.listVideo(filter, fields);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async queryVideos(
    token: string,
    filter: QueryVideoParam,
    fields?: VideoFieldOption[]
  ) {
    try {
      const display = new DisplayTicTok(token);
      return await display.queryVideo(filter, fields);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  // CONTENT RELATED FUNCTIONALITY

  async queryCreatorInfo(token: string) {
    try {
      const content = new ContentPublishTicTok(token);
      return await content.queryCreatorInfo();
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async publishImageContent(token: string, post: PostPhotoParam) {
    try {
      const content = new ContentPublishTicTok(token);
      return await content.publishImageContent(post);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async publishVideoContent(token: string, post: PostVideoParam) {
    try {
      const content = new ContentPublishTicTok(token);
      return await content.publishVideoPullFromUrlContent(post);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async uploadVideoToTikTokServer(dto: UploadPayload) {
    try {
      const content = new ContentPublishTicTok('not_required');
      return await content.uploadVideoToTikTokServer(dto);
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async publishAndUploadVideo(
    token: string,
    post: VideoPostInfo,
    file: IUploader
  ) {
    try {
      const content = new ContentPublishTicTok(token);
      return await content.publishAndUploadVideo({
        post_info: post,
        buffer: file.buffer,
        mimeType: file.mimetype,
      });
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }

  async publishVideoFileUpload(
    token: string,
    post: VideoPostInfo,
    file: IUploader
  ) {
    try {
      const content = new ContentPublishTicTok(token);
      return await content.publishVideoFileUploadContent({
        post_info: post,
        buffer: file.buffer,
        mimeType: file.mimetype,
      });
    } catch (error: any) {
      throw new HttpException(error?.message, 500);
    }
  }
}
