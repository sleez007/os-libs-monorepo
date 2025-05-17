import { END_POINT, HEADERS } from '../../common/constants';
import { requestHandler } from '../../common/service';
import { ExchangeTokenParam, TokenResponse } from '../../common/types';

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
  const body = new URLSearchParams(oAuthParam);
  const keys = Object.keys(oAuthParam);
  keys.forEach((key) => body.append(key, oAuthParam[key]));
  const response = await requestHandler<TokenResponse>({
    url: END_POINT.exchange.url,
    method: END_POINT.exchange.method,
    headers: HEADERS.urlEncoded,
    body,
  });
  return response;
};
