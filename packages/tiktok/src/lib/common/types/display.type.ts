/**
 * List Video Parameters
 * @param cursor - The cursor for pagination
 * @param max_count - The maximum count of videos to return
 */
export interface ListVideoParam {
  cursor?: number;
  max_count?: number;
}

/**
 * Query Video Parameters
 * @param video_ids - The video ids to query
 */
export interface QueryVideoParam {
  filters: {
    video_ids: string[];
  };
}

/**
 * User Field Options
 * @param open_id - The open id of the user
 * @param union_id - The union id of the user
 * @param avatar_url - The avatar url of the user
 * @param avatar_url_100 - The avatar url 100 of the user
 * @param avatar_large_url - The avatar large url of the user
 * @param display_name - The display name of the user
 * @param bio_description - The bio description of the user
 * @param profile_deep_link - The profile deep link of the user
 * @param is_verified - The is verified of the user
 * @param username - The username of the user
 * @param follower_count - The follower count of the user
 * @param following_count - The following count of the user
 * @param likes_count - The likes count of the user
 * @param video_count - The video count of the user
 */
export type fieldOption =
  | 'open_id'
  | 'union_id'
  | 'avatar_url'
  | 'avatar_url_100'
  | 'avatar_large_url'
  | 'display_name'
  | 'bio_description'
  | 'profile_deep_link'
  | 'is_verified'
  | 'username'
  | 'follower_count'
  | 'following_count'
  | 'likes_count'
  | 'video_count';

/**
 * Video Field Options
 * @param view_count - The view count of the video
 * @param share_count - The share count of the video
 * @param comment_count - The comment count of the video
 * @param like_count - The like count of the video
 * @param embed_link - The embed link of the video
 * @param embed_html - The embed html of the video
 * @param title - The title of the video
 * @param width - The width of the video
 * @param height - The height of the video
 * @param duration - The duration of the video
 * @param video_description - The video description of the video
 * @param share_url - The share url of the video
 * @param cover_image_url - The cover image url of the video
 * @param create_time - The create time of the video
 * @param id - The id of the video
 */
export type VideoFieldOption =
  | 'view_count'
  | 'share_count'
  | 'comment_count'
  | 'like_count'
  | 'embed_link'
  | 'embed_html'
  | 'title'
  | 'width'
  | 'height'
  | 'duration'
  | 'video_description'
  | 'share_url'
  | 'cover_image_url'
  | 'create_time'
  | 'id';
