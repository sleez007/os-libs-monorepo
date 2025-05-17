import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import { ListVideoParam, ListVideoResponse } from '../../common/types';

export const listVideo = async (
  accessToken: string,
  body: ListVideoParam = {}
): Promise<ListVideoResponse> => {
  const response = await requestHandler<ListVideoResponse>({
    url: END_POINT.listVideo.url,
    method: END_POINT.listVideo.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });
  return response;
};
