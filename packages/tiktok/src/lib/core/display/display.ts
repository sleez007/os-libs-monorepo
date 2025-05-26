import { userInfo, listVideo, queryVideo } from '../../api/display';
import {
  fieldOption,
  ListVideoParam,
  ListVideoResponse,
  QueryVideoParam,
  QueryVideoResponse,
  UserInfoResponse,
  VideoFieldOption,
} from '../../common/types';

export class DisplayTicTok {
  constructor(private readonly token: string) {}

  async userInfo(query?: fieldOption[]): Promise<UserInfoResponse> {
    return userInfo(this.token, query);
  }

  async listVideo(
    body: ListVideoParam,
    fields?: VideoFieldOption[]
  ): Promise<ListVideoResponse> {
    return listVideo({ accessToken: this.token, body, fields });
  }

  async queryVideo(
    body: QueryVideoParam,
    fields?: VideoFieldOption[]
  ): Promise<QueryVideoResponse> {
    return queryVideo({ accessToken: this.token, body, fields });
  }
}
