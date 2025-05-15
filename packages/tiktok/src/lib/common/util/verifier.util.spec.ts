import { generateCodeChallenge, generateCodeVerifier } from './verifier.util';

describe('generateCodeChallenge', () => {
  it('should work', () => {
    expect(generateCodeChallenge('')).toEqual(
      '47DEQpj8HBSa-_TImW-5JCeuQeRkm5NMpJWZG3hSuFU'
    );
  });
});

describe('generateCodeVerifier', () => {
  it('Should return an actual value', () => {
    expect(generateCodeVerifier()).toBeDefined();
  });
});
