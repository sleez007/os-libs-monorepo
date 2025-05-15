import { OAuthTicTok } from './oauth-tiktok';

const tiktok = new OAuthTicTok('clientKey', 'clientSecret');
describe('getRedirectUri', () => {
  it('should return a redirect uri', () => {
    const redirectUri = tiktok.getRedirectUri({
      scope: ['user.info.basic'],
      redirect_uri: 'http://localhost:3000',
      state: 'csrf_token_data',
      code_challenge_method: 'sha256',
    });
    console.log(redirectUri);
    expect(redirectUri).toHaveProperty('url');
  });
});
