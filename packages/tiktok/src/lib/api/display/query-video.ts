import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import {
  QueryVideoParam,
  QueryVideoResponse,
  VideoFieldOption,
} from '../../common/types';

export const queryVideo = async ({
  accessToken,
  body,
  fields = ['cover_image_url', 'id', 'title'],
}: {
  accessToken: string;
  body: QueryVideoParam;
  fields?: VideoFieldOption[];
}): Promise<QueryVideoResponse> => {
  const params = fields.join(',');
  console.log(body);
  const response = await requestHandler<QueryVideoResponse>({
    url: `${END_POINT.queryVideo.url}?fields=${params}`,
    method: END_POINT.queryVideo.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(body),
  });
  return response;
};
