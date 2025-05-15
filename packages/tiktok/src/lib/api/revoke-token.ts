import { END_POINT, HEADERS } from '../common/constants';
import { requestHandler } from '../common/service';
import { RevokeTokenParam } from '../common/types';

export const revokeToken = async (
  tokenParam: RevokeTokenParam,
  clientKey: string,
  clientSecret: string
): Promise<{ message: string }> => {
  const oAuthParam: Record<string, string> = {
    ...tokenParam,
    client_key: clientKey,
    client_secret: clientSecret,
  };
  const params = Object.entries(oAuthParam)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  await requestHandler({
    url: END_POINT.revoke.url,
    method: END_POINT.revoke.method,
    headers: HEADERS.urlEncoded,
    body: JSON.stringify(params),
  });
  return { message: 'Token revoked successfully' };
};
