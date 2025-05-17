import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import { RefreshTokenParam, TokenResponse } from '../../common/types';

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
  const body = new URLSearchParams(oAuthParam);
  const keys = Object.keys(oAuthParam);
  keys.forEach((key) => body.append(key, oAuthParam[key]));

  const response = await requestHandler<TokenResponse>({
    url: END_POINT.refresh.url,
    method: END_POINT.refresh.method,
    headers: HEADERS.urlEncoded,
    body,
  });
  return response;
};
