export interface ListVideoParam {
  cursor?: number;
  max_count?: number;
}

export interface QueryVideoParam {
  filters: {
    video_ids: string[];
  };
}

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
