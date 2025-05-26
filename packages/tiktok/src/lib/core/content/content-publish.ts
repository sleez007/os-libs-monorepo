import {
  PostPhotoParam,
  PostVideoParam,
  PublishResponse,
  QueryCreatorInfoResponse,
} from '../../common/types';
import {
  publishImageContent,
  publishVideoContent,
  queryCreatorInfo,
  uploadVideoToTikTokServer,
} from '../../api/content';

export class ContentPublishTicTok {
  constructor(private readonly token: string) {}

  async queryCreatorInfo(): Promise<QueryCreatorInfoResponse> {
    return queryCreatorInfo({ accessToken: this.token });
  }

  async publishImageContent(post: PostPhotoParam): Promise<PublishResponse> {
    return publishImageContent({ accessToken: this.token, post });
  }

  async publishVideoContent(post: PostVideoParam): Promise<PublishResponse> {
    return publishVideoContent({ accessToken: this.token, post });
  }

  async uploadVideoToTikTokServer(dto: {
    uploadUrl: string;
    fileBuffer: Buffer;
    headers: {
      'Content-Type': 'video/mp4' | 'video/quicktime' | 'video/webm';
      'Content-Length': string;
      'Content-Range': string;
    };
  }) {
    return uploadVideoToTikTokServer(dto);
  }
}
