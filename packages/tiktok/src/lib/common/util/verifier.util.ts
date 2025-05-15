import crypto from 'crypto';

/**
 * Generates a random code verifier for PKCE
 * @returns A random string of 43-128 characters
 */
export const generateCodeVerifier = (): string => {
  // Generate a random string between 43-128 characters
  const verifier = crypto.randomBytes(32).toString('base64url');
  return verifier;
};

/**
 * Generates a code challenge from a code verifier using SHA256
 * @param verifier The code verifier
 * @returns The code challenge
 */
export const generateCodeChallenge = (
  verifier: string,
  algorithm: 'sha256' | string = 'sha256'
): string => {
  // Create a SHA256 hash of the verifier
  const hash = crypto.createHash(algorithm).update(verifier).digest();
  // Base64url encode the hash
  return Buffer.from(hash).toString('base64url');
};
