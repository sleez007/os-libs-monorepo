/**
 * Post Photo Parameters
 * @param post_info - The post info of the photo {title: string; description: string; privacy_level: PrivacyLevel; disable_comment: boolean; auto_add_music: boolean; brand_content_toggle?: boolean; brand_organic_toggle?: boolean;}
 * @param source_info - The source info of the photo {source: 'PULL_FROM_URL'; photo_cover_index: number; photo_images: string[];}
 * @param post_mode - The post mode of the photo
 * @param media_type - The media type of the photo
 */
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

/**
 * Privacy Level
 * @param PUBLIC_TO_EVERYONE - The public to everyone of the privacy level
 * @param MUTUAL_FOLLOW_FRIENDS - The mutual follow friends of the privacy level
 * @param FOLLOWER_OF_CREATOR - The follower of creator of the privacy level
 * @param SELF_ONLY - The self only of the privacy level
 */
export type PrivacyLevel =
  | 'PUBLIC_TO_EVERYONE'
  | 'MUTUAL_FOLLOW_FRIENDS'
  | 'FOLLOWER_OF_CREATOR'
  | 'SELF_ONLY';

/**
 * File Upload Source
 * @param source - The source of the file upload
 * @param video_size - The video size of the file upload
 * @param chunk_size - The chunk size of the file upload
 * @param total_chunk_count - The total chunk count of the file upload
 */
export type FileUploadSource = {
  source: 'FILE_UPLOAD';
  video_size: number;
  chunk_size: number;
  total_chunk_count: number;
};

/**
 * Pull From Url Source
 * @param source - The source of the pull from url
 * @param video_url - The video url of the pull from url
 */
export type PullFromUrlSource = {
  source: 'PULL_FROM_URL';
  video_url: string;
};

/**
 * Video Post Info
 * @param title - The title of the video
 * @param privacy_level - The privacy level of the video
 * @param disable_duet - The disable duet of the video
 * @param disable_comment - The disable comment of the video
 * @param disable_stitch - The disable stitch of the video
 * @param video_cover_timestamp_ms - The video cover timestamp ms of the video
 * @param brand_content_toggle - The brand content toggle of the video
 * @param brand_organic_toggle - The brand organic toggle of the video
 * @param is_aigc - The is aigc of the video
 */
export interface VideoPostInfo {
  title: string;
  privacy_level: PrivacyLevel;
  disable_duet: boolean;
  disable_comment: boolean;
  disable_stitch: boolean;
  video_cover_timestamp_ms: number;
  brand_content_toggle?: boolean;
  brand_organic_toggle?: boolean;
  is_aigc?: boolean;
}

/**
 * Post Video Parameters
 * @param post_info - The post info of the video {title: string; privacy_level: PrivacyLevel; disable_duet: boolean; disable_comment: boolean; disable_stitch: boolean; video_cover_timestamp_ms: number; brand_content_toggle?: boolean; brand_organic_toggle?: boolean; is_aigc?: boolean;}
 * @param source_info - The source info of the video {source: 'FILE_UPLOAD'; video_size: number; chunk_size: number; total_chunk_count: number;}
 */
export type PostVideoParam = {
  post_info: VideoPostInfo;
  source_info: FileUploadSource | PullFromUrlSource;
};

/**
 * Video Upload Parameters
 * @param uploadUrl - The upload url of the video
 * @param {Buffer} fileBuffer - The file buffer of the video
 * @param headers - The headers of the video {Content-Type: 'video/mp4' | 'video/quicktime' | 'video/webm' | string; Content-Length: string; Content-Range: string;}
 */
export interface VideoUploadParam {
  uploadUrl: string;
  fileBuffer: Buffer;
  headers: {
    'Content-Type': 'video/mp4' | 'video/quicktime' | 'video/webm' | string;
    'Content-Length': string;
    'Content-Range': string;
  };
}

/**
 * Publish And Upload Video Parameters
 * @param post_info - The post info of the video {title: string; privacy_level: PrivacyLevel; disable_duet: boolean; disable_comment: boolean; disable_stitch: boolean; video_cover_timestamp_ms: number; brand_content_toggle?: boolean; brand_organic_toggle?: boolean; is_aigc?: boolean;}
 * @param buffer - The file buffer of the video
 * @param mimeType - The mime type of the video example 'video/mp4'
 */
export interface PublishUploadParam {
  post_info: VideoPostInfo;
  buffer: Buffer;
  mimeType: 'video/mp4' | 'video/quicktime' | 'video/webm' | string;
}

/**
 * Chunk Parameters
 * @param index - The index of the chunk
 * @param start - The start of the chunk
 * @param end - The end of the chunk
 * @param contentRange - The content range of the chunk
 */
export interface Chunk {
  index: number;
  start: number;
  end: number;
  contentRange: string;
}

/**
 *  Video Upload Payload Parameters
 * @param uploadUrl - The upload url of the video
 * @param buffer - The file buffer of the video
 * @param mimeType - The mime type of the video example 'video/mp4'
 * @param chunks - The chunks of the video
 */
export interface UploadPayload {
  uploadUrl: string;
  buffer: Buffer;
  mimeType: string;
  chunks?: Chunk[];
}
