import { userInfo, listVideo, queryVideo } from '../../api/display';
import {
  ListVideoParam,
  ListVideoResponse,
  QueryVideoParam,
  QueryVideoResponse,
  UserInfoResponse,
} from '../../common/types';

export class DisplayTicTok {
  constructor(private readonly token: string) {}

  async userInfo(): Promise<UserInfoResponse> {
    return userInfo(this.token);
  }

  async listVideo(body: ListVideoParam): Promise<ListVideoResponse> {
    return listVideo(this.token, body);
  }

  async queryVideo(body: QueryVideoParam): Promise<QueryVideoResponse> {
    return queryVideo(this.token, body);
  }
}
