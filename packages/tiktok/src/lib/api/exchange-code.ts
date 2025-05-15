import { END_POINT, HEADERS } from '../common/constants';
import { requestHandler } from '../common/service';
import { ExchangeTokenParam, TokenResponse } from '../common/types';

export const exchangeCodeForToken = async (
  tokenParam: ExchangeTokenParam,
  clientKey: string,
  clientSecret: string
): Promise<TokenResponse> => {
  const oAuthParam: Record<string, string> = {
    ...tokenParam,
    client_key: clientKey,
    client_secret: clientSecret,
  };
  const params = Object.entries(oAuthParam)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  const response = await requestHandler<TokenResponse>({
    url: END_POINT.exchange.url,
    method: END_POINT.exchange.method,
    headers: HEADERS.urlEncoded,
    body: JSON.stringify(params),
  });
  return response;
};
