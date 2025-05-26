import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import { QueryCreatorInfoResponse } from '../../common/types';

export const queryCreatorInfo = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await requestHandler<QueryCreatorInfoResponse>({
    url: END_POINT.queryCreatorInfo.url,
    method: END_POINT.queryCreatorInfo.method,
    headers: { ...HEADERS.tiktokApi, Authorization: `Bearer ${accessToken}` },
  });
  return response;
};
