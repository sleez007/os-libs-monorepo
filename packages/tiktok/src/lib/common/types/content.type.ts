export interface PostPhotoResponse {
  post_info: {
    title: string;
    description: string;
    privacy_level: string;
    disable_comment: boolean;
    auto_add_music: boolean;
  };
  source_info: {
    source: 'PULL_FROM_URL' | 'FILE_UPLOAD';
    photo_cover_index: number;
    photo_images: string[];
  };
  post_mode: 'DIRECT_POST' | string;
  media_type: 'PHOTO' | 'VIDEO';
}
