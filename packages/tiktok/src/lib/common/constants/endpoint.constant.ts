const BASE_URL = 'https://open.tiktok.com/v1/oauth';

const TIKTOK_APIS_BASE_URL = 'https://open.tiktokapis.com/v2';

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
  userInfo: {
    url: `${TIKTOK_APIS_BASE_URL}/user/info`,
    method: 'GET',
  },
  listVideo: {
    url: `${TIKTOK_APIS_BASE_URL}/list_video`,
    method: 'POST',
  },
  queryVideo: {
    url: `${TIKTOK_APIS_BASE_URL}/query_video`,
    method: 'POST',
  },
};

export const HEADERS = {
  urlEncoded: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  tiktokApi: {
    'Content-Type': 'application/json',
  },
};
