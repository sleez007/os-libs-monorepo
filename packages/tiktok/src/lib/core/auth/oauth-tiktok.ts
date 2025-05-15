import {
  exchangeCodeForToken,
  getRedirectUri,
  refreshToken,
  revokeToken,
} from '../../api';
import {
  ExchangeTokenParam,
  OauthParam,
  RefreshTokenParam,
  RevokeTokenParam,
  TokenResponse,
} from '../../common/types';

export class OAuthTicTok {
  constructor(
    private readonly clientKey: string,
    private readonly clientSecret: string
  ) {}

  getRedirectUri(authParams: OauthParam, ignoreCodeChallenge = false) {
    return getRedirectUri(authParams, ignoreCodeChallenge, this.clientKey);
  }

  async exchangeCodeForToken(
    tokenParam: ExchangeTokenParam
  ): Promise<TokenResponse> {
    return exchangeCodeForToken(tokenParam, this.clientKey, this.clientSecret);
  }

  async refreshToken(
    refreshTokenParam: RefreshTokenParam
  ): Promise<TokenResponse> {
    return refreshToken(refreshTokenParam, this.clientKey, this.clientSecret);
  }

  async revokeToken(tokenParam: RevokeTokenParam) {
    return revokeToken(tokenParam, this.clientKey, this.clientSecret);
  }
}
