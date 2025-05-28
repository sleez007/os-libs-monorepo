import { Chunk, PrivacyLevel } from './content.type';

/**
 * Token Response
 * @param open_id - The open id of the user
 * @param access_token - The access token of the user
 * @param expires_in - The expires in of the user
 * @param refresh_token - The refresh token of the user
 * @param refresh_expires_in - The refresh expires in of the user
 * @param scope - The scope of the user
 * @param token_type - The token type of the user
 */
export interface TokenResponse {
  open_id: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  scope: string;
  token_type: 'Bearer' | string;
}

/**
 * User Info Response
 * @param open_id - The open id of the user
 * @param username - The username of the user
 * @param avatar_url - The avatar url of the user
 * @param display_name - The display name of the user
 * @param video_count - The video count of the user
 * @param likes_count - The likes count of the user
 * @param followers_count - The followers count of the user
 * @param following_count - The following count of the user
 * @param is_verified - The is verified of the user
 * @param profile_deep_link - The profile deep link of the user
 * @param bio_description - The bio description of the user
 * @param average_url_100 - The average url 100 of the user
 * @param union_id - The union id of the user
 * @param avatar_large_url - The avatar large url of the user
 */
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

/**
 * Video Interface
 * @param cover_image_url - The cover image url of the video
 * @param id - The id of the video
 * @param title - The title of the video
 */
export interface IVideo {
  cover_image_url: string;
  id: string;
  title: string;
}

/**
 * Content Error Interface
 * @param code - The code of the error
 * @param message - The message of the error
 * @param log_id - The log id of the error
 */
export interface ContentError {
  code: string;
  message: string;
  log_id: string;
}

/**
 * List Video Response
 * @param data - The data of the response {videos: IVideo[]; cursor: number; has_more: boolean}
 * @param error - The error of the response
 */
export interface ListVideoResponse {
  data: {
    videos: IVideo[];
    cursor: number;
    has_more: boolean;
  };
  error: ContentError;
}

/**
 * Query Video Response
 * @param data - The data of the response {videos: Pick<IVideo, 'id' | 'title'>[]}
 * @param error - The error of the response
 */
export interface QueryVideoResponse {
  data: {
    videos: Pick<IVideo, 'id' | 'title'>[];
  };
  error: ContentError;
}

/**
 * Content Response
 * @param data - The data of the response {publish_id: string}
 * @param error - The error of the response
 */
export interface ContentResponse {
  data: {
    publish_id: string;
  };
  error: ContentError;
}

/**
 * Query Creator Info Response
 * @param data - The data of the response {creator_avatar_url: string; creator_username: string; creator_nickname: string; privacy_level_options: PrivacyLevel[]; comment_disabled: boolean; duet_disabled: boolean; stitch_disabled: boolean; max_video_post_duration_sec: number;}
 * @param error - The error of the response
 */
export interface QueryCreatorInfoResponse {
  data: {
    creator_avatar_url: string;
    creator_username: string;
    creator_nickname: string;
    privacy_level_options: PrivacyLevel[];
    comment_disabled: boolean;
    duet_disabled: boolean;
    stitch_disabled: boolean;
    max_video_post_duration_sec: number;
  };
  error: ContentError;
}

/**
 * Publish Response
 * @param data - The data of the response {publish_id: string; upload_url?: string}
 * @param error - The error of the response
 */
export interface PublishResponse {
  data: {
    publish_id: string;
    upload_url?: string;
  };
  error: ContentError;
  chunks: Chunk[];
  mimeType: string;
}
