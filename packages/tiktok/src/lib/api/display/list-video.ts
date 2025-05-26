import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import {
  ListVideoParam,
  ListVideoResponse,
  VideoFieldOption,
} from '../../common/types';

export const listVideo = async ({
  accessToken,
  body = {},
  fields = ['cover_image_url', 'id', 'title'],
}: {
  accessToken: string;
  body: ListVideoParam;
  fields?: VideoFieldOption[];
}): Promise<ListVideoResponse> => {
  const params = fields.join(',');
  const response = await requestHandler<ListVideoResponse>({
    url: `${END_POINT.listVideo.url}?fields=${params}`,
    method: END_POINT.listVideo.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });
  return response;
};
