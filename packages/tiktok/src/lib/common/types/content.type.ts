export interface PostPhotoParam {
  post_info: {
    title: string;
    description: string;
    privacy_level: PrivacyLevel;
    disable_comment: boolean;
    auto_add_music: boolean;
    brand_content_toggle?: boolean;
    brand_organic_toggle?: boolean;
  };
  source_info: {
    source: 'PULL_FROM_URL';
    photo_cover_index: number;
    photo_images: string[];
  };
  post_mode: 'DIRECT_POST' | string;
  media_type: 'PHOTO' | 'VIDEO';
}

export type PrivacyLevel =
  | 'PUBLIC_TO_EVERYONE'
  | 'MUTUAL_FOLLOW_FRIENDS'
  | 'FOLLOWER_OF_CREATOR'
  | 'SELF_ONLY';

type FileUploadSource = {
  source: 'FILE_UPLOAD';
  video_size: number;
  chunk_size: number;
  total_chunk_count: number;
};

type PullFromUrlSource = {
  source: 'PULL_FROM_URL';
  video_url: string;
};

export type PostVideoParam = {
  post_info: {
    title: string;
    privacy_level: PrivacyLevel;
    disable_duet: boolean;
    disable_comment: boolean;
    disable_stitch: boolean;
    video_cover_timestamp_ms: number;
    brand_content_toggle?: boolean;
    brand_organic_toggle?: boolean;
    is_aigc?: boolean;
  };
  source_info: FileUploadSource | PullFromUrlSource;
};
