# @innovatespace/ig-business

A TypeScript library for Instagram Business API integration, providing OAuth authentication and content publishing capabilities.

[![npm version](https://badge.fury.io/js/@innovatespace%2Fig-business.svg)](https://badge.fury.io/js/@innovatespace%2Fig-business)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- 🔐 **OAuth Authentication** - Complete Instagram OAuth flow implementation
- 📸 **Content Publishing** - Publish images, videos, and carousel posts
- 🎯 **TypeScript Support** - Fully typed for better development experience
- 🚀 **Modern ESM** - Built with ES modules for optimal tree-shaking
- ⚡ **Zero Dependencies** - Lightweight with no external dependencies

## Installation

```bash
npm install @innovatespace/ig-business
```

```bash
yarn add @innovatespace/ig-business
```

```bash
pnpm add @innovatespace/ig-business
```

## Quick Start

### OAuth Authentication

```typescript
import { OAuthInstagram } from '@innovatespace/ig-business';

const oauth = new OAuthInstagram('your-client-id', 'your-client-secret');

// Step 1: Generate OAuth redirect URL
const redirectUrl = OAuthInstagram.getRedirectUri({
  scope: ['instagram_business_basic', 'instagram_business_content_publish'],
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  state: 'optional-state-parameter'
});

// Step 2: Exchange authorization code for short-lived token
const shortLivedToken = await oauth.getShortLivedInstagramAccessToken(
  'https://your-app.com/callback',
  'authorization-code-from-callback'
);

// Step 3: Convert to long-lived token (60 days)
const longLivedToken = await oauth.getLongLivedInstagramAccessToken(
  shortLivedToken.access_token
);

// Step 4: Refresh token when needed
const refreshedToken = await oauth.refreshInstagramAccessToken(
  longLivedToken.access_token
);
```

### Content Publishing

```typescript
import { InstagramPublish } from '@innovatespace/ig-business';

const publisher = new InstagramPublish(
  'your-access-token',
  'instagram-business-account-id'
);

// Publish a single image
const imageContainer = await publisher.createContainer({
  image_url: 'https://example.com/image.jpg'
});

const publishedImage = await publisher.publishContainer(imageContainer.id);

// Publish a video
const videoContainer = await publisher.createContainer({
  video_url: 'https://example.com/video.mp4',
  media_type: 'VIDEO'
});

const publishedVideo = await publisher.publishContainer(videoContainer.id);

// Publish a carousel post
const carouselItems = [
  await publisher.createContainer({
    image_url: 'https://example.com/image1.jpg',
    is_carousel_item: true
  }),
  await publisher.createContainer({
    image_url: 'https://example.com/image2.jpg',
    is_carousel_item: true
  })
];

const carouselContainer = await publisher.createCarouselContainer({
  children: carouselItems.map(item => item.id),
  media_type: 'CAROUSEL'
});

const publishedCarousel = await publisher.publishContainer(carouselContainer.id);
```

## API Reference

### OAuthInstagram

Handles Instagram OAuth authentication flow.

#### Constructor

```typescript
new OAuthInstagram(clientId: string, clientSecret: string)
```

#### Methods

##### `getRedirectUri(params: RedirectParam): string`

Generates the OAuth authorization URL.

**Parameters:**

- `scope`: Array of Instagram Business API scopes
- `clientId`: Your Instagram app client ID
- `redirectUri`: Your app's callback URL
- `force_reauth?`: Force re-authentication (optional)
- `state?`: Custom state parameter (optional)

**Available Scopes:**

- `instagram_business_basic`
- `instagram_business_manage_messages`
- `instagram_business_manage_comments`
- `instagram_business_content_publish`

##### `getShortLivedInstagramAccessToken(redirectUri: string, code: string): Promise<CodeExchangeResponse>`

Exchanges authorization code for a short-lived access token.

##### `getLongLivedInstagramAccessToken(shortLivedToken: string): Promise<TokenExchangeResponse>`

Converts short-lived token to long-lived token (60 days).

##### `refreshInstagramAccessToken(longLivedToken: string): Promise<TokenExchangeResponse>`

Refreshes an expired long-lived access token.

### InstagramPublish

Handles Instagram content publishing.

#### InstagramPublish Constructor

```typescript
new InstagramPublish(accessToken: string, accountId: string, version?: string)
```

**Parameters:**

- `accessToken`: Instagram access token
- `accountId`: Instagram Business account ID
- `version`: API version (default: 'v23.0')

#### Publishing Methods

##### `createContainer(params: CreateContainerParam): Promise<CreateContainerResponse>`

Creates a media container for publishing.

**Parameters:**

- `image_url?`: URL of the image to publish
- `video_url?`: URL of the video to publish
- `media_type?`: Media type ('VIDEO', 'REELS', 'STORIES')
- `is_carousel_item?`: Whether this is part of a carousel
- `upload_type?`: Upload type ('resumable' for large files)

##### `createCarouselContainer(params: CreateCarouselContainerParam): Promise<CreateContainerResponse>`

Creates a carousel container.

**Parameters:**

- `children`: Array of container IDs or single container ID
- `media_type?`: Should be 'CAROUSEL'

##### `publishContainer(containerId: string): Promise<PublishContainerResponse>`

Publishes a created container to Instagram.

## Error Handling

```typescript
try {
  const container = await publisher.createContainer({
    image_url: 'https://example.com/image.jpg'
  });
  
  const result = await publisher.publishContainer(container.id);
  console.log('Published successfully:', result.id);
} catch (error) {
  console.error('Publishing failed:', error.message);
}
```

## Requirements

- Node.js 14 or higher
- Instagram Business Account
- Facebook App with Instagram Basic Display and Instagram API permissions
- Valid Instagram Business API access token

## Getting Instagram API Credentials

1. Create a Facebook App at [Facebook Developers](https://developers.facebook.com/)
2. Add Instagram Basic Display and Instagram API products
3. Configure OAuth redirect URIs
4. Get your Client ID and Client Secret
5. Follow the OAuth flow to get access tokens

For detailed setup instructions, visit the [Instagram Basic Display API documentation](https://developers.facebook.com/docs/instagram-basic-display-api/getting-started).

## TypeScript Support

This library is written in TypeScript and includes full type definitions. All API responses and parameters are properly typed for better development experience.

```typescript
import type { 
  CreateContainerParam, 
  CreateContainerResponse,
  TokenExchangeResponse 
} from '@innovatespace/ig-business';
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.
