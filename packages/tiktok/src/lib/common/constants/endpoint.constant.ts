// const BASE_URL = 'https://open.tiktok.com/v2/oauth';

const BASE_URL = 'https://open.tiktokapis.com/v2';

export const END_POINT = {
  authorize: {
    url: `https://www.tiktok.com/v2/auth/authorize/`,
    method: 'GET',
  },
  exchange: {
    url: `${BASE_URL}/oauth/token/`,
    method: 'POST',
  },
  refresh: {
    url: `${BASE_URL}/oauth/token/`,
    method: 'POST',
  },
  revoke: {
    url: `${BASE_URL}/oauth/revoke/`,
    method: 'POST',
  },
  userInfo: {
    url: `${BASE_URL}/user/info/`,
    method: 'GET',
  },
  listVideo: {
    url: `${BASE_URL}/video/list/`,
    method: 'POST',
  },
  queryVideo: {
    url: `${BASE_URL}/video/query/`,
    method: 'POST',
  },
  queryCreatorInfo: {
    url: `${BASE_URL}/post/publish/creator_info/query/`,
    method: 'POST',
  },
  uploadVideoContent: {
    url: `${BASE_URL}/post/publish/video/init/`,
    method: 'POST',
  },
  uploadToServer: {
    url: 'https://open-upload.tiktokapis.com/upload/',
    method: 'PUT',
  },
  uploadPhotoContent: {
    url: `${BASE_URL}/post/publish/content/init/`,
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
