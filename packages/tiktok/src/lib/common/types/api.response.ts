export interface TokenResponse {
  open_id: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  scope: string;
  token_type: string;
}

export interface UserInfoResponse {
  open_id: string;
  username: string;
  avatar_url: string;
  display_name: string;
  video_count: number;
  likes_count: number;
  followers_count: number;
  following_count: number;
  is_verified: boolean;
  profile_deep_link: string;
  bio_description: string;
  average_url_100: string;
  union_id: string;
  avatar_large_url: string;
}

export interface IVideo {
  cover_image_url: string;
  id: string;
  title: string;
}
export interface ContentError {
  code: string;
  message: string;
  log_id: string;
}

export interface ListVideoResponse {
  data: {
    videos: IVideo[];
    cursor: number;
    has_more: boolean;
  };
  error: ContentError;
}

export interface QueryVideoResponse {
  data: {
    videos: Pick<IVideo, 'id' | 'title'>[];
  };
  error: ContentError;
}

export interface ContentResponse {
  data: {
    publish_id: string;
  };
  error: ContentError;
}
