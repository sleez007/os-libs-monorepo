import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import { UserInfoResponse } from '../../common/types';

export const userInfo = async (
  accessToken: string
): Promise<UserInfoResponse> => {
  const response = await requestHandler<UserInfoResponse>({
    url: END_POINT.userInfo.url,
    method: END_POINT.userInfo.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
  });
  return response;
};
