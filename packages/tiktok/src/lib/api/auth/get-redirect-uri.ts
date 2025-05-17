import { END_POINT } from '../../common/constants';
import { OauthParam } from '../../common/types';
import { generateCodeChallenge, generateCodeVerifier } from '../../common/util';

export const getRedirectUri = (
  authParams: OauthParam,
  ignoreCodeChallenge: boolean,
  clientKey: string
) => {
  let verifier;
  const scope = Array.isArray(authParams.scope)
    ? authParams.scope.join(',')
    : authParams.scope;
  const oAuthData: Record<string, string> = {
    scope,
    redirect_uri: authParams.redirect_uri,
    response_type: 'code',
    state: authParams.state,
    code_challenge_method: authParams.code_challenge_method,
    client_key: clientKey,
  };
  if (!ignoreCodeChallenge) {
    verifier = authParams.verifier || generateCodeVerifier();
    authParams.code_challenge =
      authParams.code_challenge ||
      generateCodeChallenge(verifier, authParams.code_challenge_method);
    oAuthData.code_challenge = authParams.code_challenge;
  }

  const params = Object.entries(oAuthData)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return {
    url: `${END_POINT.authorize.url}?${params}`,
    ...(!ignoreCodeChallenge && { verifier }),
    ...(oAuthData?.code_challenge && {
      code_challenge: oAuthData.code_challenge,
    }),
  };
};
