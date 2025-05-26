import { PostPhotoParam, PublishResponse } from '../../common/types';
import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';

export const publishImageContent = async ({
  accessToken,
  post,
}: {
  accessToken: string;
  post: PostPhotoParam;
}) => {
  const response = await requestHandler<PublishResponse>({
    url: END_POINT.uploadPhotoContent.url,
    method: END_POINT.uploadPhotoContent.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(post),
  });
  return response;
};
