/**
 * Exchange Token Parameters
 * @param code - The code received from the authorization server
 * @param code_verifier - The code verifier used in the authorization request
 * @param grant_type - The grant type, should be "authorization_code"
 * @param redirect_uri - The redirect uri used in the authorization request
 */
export interface ExchangeTokenParam {
  code: string;
  code_verifier?: string;
  grant_type: string;
  redirect_uri: string;
}

/**
 * Refresh Token Parameters
 * @param refresh_token - The refresh token received from the authorization server
 */
export interface RefreshTokenParam {
  refresh_token: string;
}

/**
 * OAuth Parameters
 * @param scope - The scope of the application
 * @param redirect_uri - The redirect uri of the application
 * @param state - The state of the application
 * @param code_challenge - The code challenge of the application
 * @param code_challenge_method - The code challenge method of the application
 * @param verifier - The verifier of the application
 */
export interface OauthParam {
  scope: string[] | string;
  redirect_uri: string;
  state: string;
  code_challenge?: string;
  code_challenge_method: string;
  verifier?: string;
}

/**
 * Revoke Token Parameters
 * @param token - The token to revoke
 */
export interface RevokeTokenParam {
  token: string;
}
