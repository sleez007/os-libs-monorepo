import {
  PostVideoParam,
  PublishResponse,
  VideoUploadParam,
} from '../../common/types';
import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';

export const publishVideoContent = async ({
  accessToken,
  post,
}: {
  accessToken: string;
  post: PostVideoParam;
}) => {
  const response = await requestHandler<PublishResponse>({
    url: END_POINT.uploadVideoContent.url,
    method: END_POINT.uploadVideoContent.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(post),
  });
  return response;
};

export const uploadVideoToTikTokServer = async ({
  headers,
  fileBuffer,
  uploadUrl,
}: VideoUploadParam) => {
  await requestHandler({
    url: uploadUrl,
    method: 'PUT',
    headers,
    body: fileBuffer,
  });
  return { message: 'Uploaded' };
};
