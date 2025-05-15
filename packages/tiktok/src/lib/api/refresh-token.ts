import { END_POINT, HEADERS } from '../common/constants';
import { requestHandler } from '../common/service';
import { RefreshTokenParam, TokenResponse } from '../common/types';

export const refreshToken = async (
  refreshTokenParam: RefreshTokenParam,
  clientKey: string,
  clientSecret: string
): Promise<TokenResponse> => {
  const oAuthParam: Record<string, string> = {
    ...refreshTokenParam,
    grant_type: 'refresh_token',
    client_key: clientKey,
    client_secret: clientSecret,
  };
  const params = Object.entries(oAuthParam)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const response = await requestHandler<TokenResponse>({
    url: END_POINT.refresh.url,
    method: END_POINT.refresh.method,
    headers: HEADERS.urlEncoded,
    body: JSON.stringify(params),
  });
  return response;
};
