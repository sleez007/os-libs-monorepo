# TikTok Library for Node.js and SSR Frameworks

A Node.js client library that wraps the TikTok API. Current implementation covers login with TikTok, Display API, and Content Publish API.

## Prerequisites

You need to [create a TikTok Developer Account](https://developers.tiktok.com/login) to get your client ID and secret keys. Please complete the following checklist before proceeding with implementation:

- If you plan on using the Content Publish PULL_FROM_URL API ([see documentation](https://developers.tiktok.com/doc/content-posting-api-media-transfer-guide#pull_from_url)), ensure you complete domain verification and that your upload URLs contain the domain specified on the dashboard. Also, link the TikTok account you plan to use for testing to the developer dashboard ([see instructions](https://developers.tiktok.com/doc/add-a-sandbox?enter_method=left_navigation)).

- If you plan on using the login functionality, add your callback URL in the dashboard ([see instructions](https://developers.tiktok.com/doc/login-kit-web?enter_method=left_navigation)).

## Installation

```bash
npm install @innovate/tiktok
```

## OAuth Usage

### Instantiating the OAuthTicTok Class

```typescript
import { OAuthTicTok } from '@innovate/tiktok';

const oauth = new OAuthTicTok('your-client-id', 'your-client-secret');
```

### Get Redirect URI

```typescript
const data = await oauth.getRedirectUri({
  scope: [
    'user.info.basic',
    'user.info.profile',
    'user.info.stats',
    'video.list',
    'video.publish',
    'video.upload',
  ], // You can also use comma-separated string format: 'user.info.basic,user.info.profile,user.info.stats,video.list,video.publish,video.upload'
  redirect_uri: 'your-redirect-uri',
  state: "csrf_token",
  code_challenge_method: "sha256" // Your preferred encryption method, defaults to sha256
});

console.log(data)

// Response structure:
// {
//    "url": "url_to_redirect_to",
//    "verifier": "challenge_verifier",
//    "code_challenge": "code_challenge" // Not required, but useful for logging
// }
```

### Exchange Code for Token

```typescript
// This method is used when TikTok triggers your callback URL with the code for the logged-in user.
// Pass that code and CSRF token to get the user session tokens (access token, refresh token, and expiry time)
const data = await oauth.exchangeCodeForToken({
  code: 'your-code',
  verifier: 'CSRF-TOKEN',
});

console.log(data);

// data is:
// {
//    "access_token": "access_token",
//    "refresh_token": "refresh_token",
//    "token_type": "Bearer",
//    "expires_in": "expires_in" // access token expiry time in seconds. usually an hour
//    "scope": "scope" // scope covered by the access token i.e 'user.info.basic,user.info.profile,user.info.stats,video.list,video.publish,video.upload',
//    "open_id": "open_id", // user id
//    "refresh_expires_in": "refresh_expires_in" // refresh token expiry time in seconds usually 30 days
// }
```

### Revoke Token

```typescript
// This method is used to revoke the access and refresh tokens
const data = await oauth.revokeToken({
  token: 'access-token',
});

console.log(data);

// data is:
// {
//     "message": "Token revoked successfully"
// }
```

### Refresh Token

```typescript
// This method is used to refresh the access token
const data = await oauth.refreshToken({
  token: 'refresh-token',
});

console.log(data);

// data is:
// {
//    "access_token": "access_token",
//    "refresh_token": "refresh_token",
//    "token_type": "Bearer",
//    "expires_in": "expires_in" // access token expiry time in seconds. usually an hour
//    "scope": "scope" // scope covered by the access token i.e 'user.info.basic,user.info.profile,user.info.stats,video.list,video.publish,video.upload',
//    "open_id": "open_id", // user id
//    "refresh_expires_in": "refresh_expires_in" // refresh token expiry time in seconds usually 30 days
// }
```

## Display API Usage

### Instantiating the DisplayTicTok Class

```typescript
import { DisplayTicTok } from '@innovate/tiktok';

const display = new DisplayTicTok('your-access-token');
```

### Get User Data

```typescript
// This method is used to get the user data
// Please pass only the fields you are interested in and also only the one covered by your token scope
import { fieldOption } from '@innovate/tiktok';
const fields: fieldOption[] = ['open_id', 'union_id', 'avatar_url']; // Pass the fields you are interested in
const data = await display.userInfo(fields);

console.log(data);

// data is:
// {
//     "data": {
//         "user": {
//             "open_id": "open_id",
//             "avatar_url": "avatar_url",
//             "union_id": "union_id",
//         }
//     },
//     "error": {
//         "code": "ok",
//         "message": "",
//         "log_id": "log_id"
//     }
// }
```

### List Videos

```typescript
// This method is used to list user videos
import { VideoFieldOption } from '@innovate/tiktok';
const fields: VideoFieldOption[] = ['id', 'title']; // Pass the fields you are interested in. see more https://developers.tiktok.com/doc/tiktok-api-v2-video-list?enter_method=left_navigation

const filter = {
  filters: {
    max_count: 6, // Pagination size you need
    cursor: 'cursor_id' // Optional
  },
};
const data = await display.listVideo(filter, fields);

console.log(data);

// data is:
// {
//     "data": {
//         "videos": [
//             {
//                 "id": "video_id",
//                 "title": "video_title",
//             }
//         ]
//     },
//     "error": {
//         "code": "ok",
//         "message": "",
//         "log_id": "log_id"
//     }
// }
```

### Query Videos

```typescript
// This method is used to query user videos
import { VideoFieldOption } from '@innovate/tiktok';
const fields: VideoFieldOption[] = ['id', 'title']; // Pass the fields you are interested in. see more https://developers.tiktok.com/doc/tiktok-api-v2-video-query?enter_method=left_navigation

const filter = {
  filters: {
    video_ids: ['video_id_1', 'video_id_2'],
  },
};
const data = await display.queryVideo(filter, fields);

console.log(data);

// data is:
// {
//     "data": {
//         "videos": [
//             {
//                 "id": "video_id",
//                 "title": "video_title",
//             }
//         ]
//     },
//     "error": {
//         "code": "ok",
//         "message": "",
//         "log_id": "log_id"
//     }
// }
```

## Content Publish API Usage

### Instantiating the ContentPublishTicTok Class

```typescript
import { ContentPublishTicTok } from '@innovate/tiktok';

const content = new ContentPublishTicTok('your-access-token');
```

### Query Creator Info

```typescript
const data = await content.queryCreatorInfo();

console.log(data);

// data is:
// {
//    "data":{
//       "creator_avatar_url": "https://lf16-tt4d.tiktokcdn.com/obj/tiktok-open-platform/8d5740ac3844be417beeacd0df75aef1",
//       "creator_username": "tiktok",
//       "creator_nickname": "TikTok Official",
//       "privacy_level_options": ["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "SELF_ONLY"],
//       "comment_disabled": false,
//       "duet_disabled": false,
//       "stitch_disabled": true,
//       "max_video_post_duration_sec": 300
//    },
//     "error": {
//          "code": "ok",
//          "message": "",
//          "log_id": "202210112248442CB9319E1FB30C1073F3"
//      }
// }
```

### Publish Image Content

```typescript
const data = await content.publishImageContent({
  post_info: {
    title: 'Hello World',
    description: 'Hello World',
    privacy_level: 'PUBLIC_TO_EVERYONE',
    disable_comment: false,
    auto_add_music: false,
    brand_content_toggle: false,
    brand_organic_toggle: false,
  },
  source_info: {
    source: 'PULL_FROM_URL',
    photo_cover_index: 0,
    photo_images: ['https://example.com/image.jpg'],
  },
  post_mode: 'DIRECT_POST',
  media_type: 'PHOTO',
});

console.log(data);

// data is:
// {
//     "data": {
//         "publish_id": "p_pub_url~v2.123456789"
//     },
//     "error": {
//          "code": "ok",
//          "message": "",
//          "log_id": "202210112248442CB9319E1FB30C1073F3"
//      }
// }
```

### Publish Video Content via PULL_FROM_URL

```typescript
const data = await content.publishVideoPullFromUrlContent({
  post_info: {
    title: 'Hello World',
    privacy_level: 'PUBLIC_TO_EVERYONE', //see https://developers.tiktok.com/doc/content-posting-api-reference-direct-post?enter_method=left_navigation
    disable_duet: false,
    disable_comment: false,
    disable_stitch: false,
    video_cover_timestamp_ms: 0,
    brand_content_toggle: false,
    brand_organic_toggle: false,
    is_aigc: false,
  },
  source_info: {
    source: 'PULL_FROM_URL',
    video_url: 'https://example.com/video.mp4',
  },
});

console.log(data);

// data is:
// {
//     "data": {
//         "publish_id": "p_pub_url~v2.123456789"
//     },
//     "error": {
//          "code": "ok",
//          "message": "",
//          "log_id": "202210112248442CB9319E1FB30C1073F3"
//      }
// }
```

### Publish Video Content via FILE_UPLOAD

```typescript
const payload: UploadPayload = {
  uploadUrl: 'upload_url', // URL retrieved from the post publish endpoint, see https://developers.tiktok.com/doc/content-posting-api-reference-direct-post?enter_method=left_navigation
  buffer: Buffer,
  mimeType: 'video/mp4',
  chunks: Chunk[] // Optional: this will be recalculated from the buffer if omitted
}
const data = await content.uploadVideoToTikTokServer(payload);

console.log(data);

// data is:
// {
//     uploads: {
//         message: string; // Message per chunk uploaded. This is computed based on the size of the uploaded file and number of chunks generated following TikTok rules
//                          // See https://developers.tiktok.com/doc/content-posting-api-media-transfer-guide?enter_method=left_navigation
//     }[];
//     chunks: number;
// }
```

### Publish Video Content via Publish and Upload with Ease (**Recommended**)

This method is a wrapper around the publish and upload video methods. It handles the entire upload process for you, so you can publish and upload your file in one go.

```typescript
const payload: PublishUploadParam = {
  post_info: {
    title: 'Hello World',
    privacy_level: 'PUBLIC_TO_EVERYONE', //see https://developers.tiktok.com/doc/content-posting-api-reference-direct-post?enter_method=left_navigation
    disable_duet: false,
    disable_comment: false,
    disable_stitch: false,
    video_cover_timestamp_ms: 0,
    brand_content_toggle: false,
    brand_organic_toggle: false,
    is_aigc: false,
  },
  buffer: Buffer,
  mimeType: 'video/mp4',
};
const data = await content.publishAndUploadVideo(payload);

console.log(data);

// data is:
// {
//     publishResponse: {
//         data: {
//             publish_id: string;
//             upload_url?: string;
//         };
//         error: {
//             "code": "ok",
//             "message": "",
//             "log_id":"202210112248442CB9319E1FB30C1073F3"
//         }
//     },
//     uploads: {
//         message: string;
//     }[];
// }
```

### Publish Video Via File Upload

```typescript
const payload: PublishUploadParam = {
  post_info: {
    title: 'Hello World',
    privacy_level: 'PUBLIC_TO_EVERYONE', //see https://developers.tiktok.com/doc/content-posting-api-reference-direct-post?enter_method=left_navigation
    disable_duet: false,
    disable_comment: false,
    disable_stitch: false,
    video_cover_timestamp_ms: 0,
    brand_content_toggle: false,
    brand_organic_toggle: false,
    is_aigc: false,
  },
  buffer: Buffer,
  mimeType: 'video/mp4',
};
const data = await content.publishVideoFileUploadContent(payload);

console.log(data);

// data is:
// {
//     data: {
//         publish_id: string;
//         upload_url?: string;
//     };
//     error: ContentError;
//     chunks: Chunk[];
//     mimeType: string;
// }
```

## Development

### Building

```bash
nx build tiktok
```

### Running Unit Tests

```bash
nx test tiktok
```

Tests are executed using [Jest](https://jestjs.io).

## Contributing

Please read our [contributing guide](https://github.com/innovate-ai/tiktok/blob/main/CONTRIBUTING.md) to learn how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- [Kingsley Etoka](https://github.com/sleez007)

## Acknowledgments

- [TikTok API Documentation](https://developers.tiktok.com/doc/overview)
