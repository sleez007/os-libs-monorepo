import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import { fieldOption, UserInfoResponse } from '../../common/types';

export const userInfo = async (
  accessToken: string,
  query: fieldOption[] = ['open_id', 'display_name']
): Promise<UserInfoResponse> => {
  if (query.length == 0) throw new Error('No fields provided');
  const params = query.join(',');
  const response = await requestHandler<UserInfoResponse>({
    url: `${END_POINT.userInfo.url}?fields=${params}`,
    method: END_POINT.userInfo.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
  });
  return response;
};
