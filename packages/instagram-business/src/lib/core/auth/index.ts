import {
  CodeExchangeResponse,
  RedirectParam,
  TokenExchangeResponse,
} from '../../type';
import { ENDPOINTS } from '../../internals/constants';
import { requestHelper } from '../../service';

export class OAuthInstagram {
  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

  static getRedirectUri({
    scope,
    clientId,
    redirectUri,
    force_reauth,
    state,
  }: RedirectParam): string {
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scope.join(','),
      ...(force_reauth && { force_reauth: 'true' }),
      ...(state && { state }),
    });

    return `${ENDPOINTS.oauth}?${params.toString()}`;
  }

  async getShortLivedInstagramAccessToken(
    redirectUri: string,
    code: string
  ): Promise<CodeExchangeResponse> {
    const formData = new FormData();
    formData.append('client_id', this.clientId);
    formData.append('client_secret', this.clientSecret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', redirectUri);
    formData.append('code', code);

    const response = await requestHelper<CodeExchangeResponse>({
      url: ENDPOINTS.accessExchange,
      method: 'POST',
      body: formData,
    });

    return response;
  }

  async getLongLivedInstagramAccessToken(
    shortLivedAccessToken: string
  ): Promise<TokenExchangeResponse> {
    const params = new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret: this.clientSecret,
      access_token: shortLivedAccessToken,
    });

    const url = `${ENDPOINTS.longLivedTokenExchange}?${params.toString()}`;

    const response = await requestHelper<TokenExchangeResponse>({
      url,
      method: 'GET',
      format: 'json',
    });

    return response;
  }

  async refreshInstagramAccessToken(
    longLivedAccessToken: string
  ): Promise<TokenExchangeResponse> {
    const params = new URLSearchParams({
      grant_type: 'ig_refresh_token',
      access_token: longLivedAccessToken,
    });
    const url = `${ENDPOINTS.refreshEndPoint}?${params.toString()}`;
    const response = await requestHelper<TokenExchangeResponse>({
      url,
      method: 'GET',
      format: 'json',
    });
    return response;
  }
}
