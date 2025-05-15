const BASE_URL = 'https://open.tiktok.com/v1/oauth';

export const END_POINT = {
  authorize: {
    url: `${BASE_URL}/authorize`,
    method: 'GET',
  },
  exchange: {
    url: `${BASE_URL}/access_token`,
    method: 'POST',
  },
  refresh: {
    url: `${BASE_URL}/access_token`,
    method: 'POST',
  },
  revoke: {
    url: `${BASE_URL}/revoke`,
    method: 'POST',
  },
};

export const HEADERS = {
  urlEncoded: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
