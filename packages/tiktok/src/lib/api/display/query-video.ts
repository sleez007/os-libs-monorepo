import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import { QueryVideoParam, QueryVideoResponse } from '../../common/types';

export const queryVideo = async (
  accessToken: string,
  body: QueryVideoParam
): Promise<QueryVideoResponse> => {
  const response = await requestHandler<QueryVideoResponse>({
    url: END_POINT.queryVideo.url,
    method: END_POINT.queryVideo.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });
  return response;
};
