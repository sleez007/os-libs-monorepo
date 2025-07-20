type Scope =
  | 'instagram_business_basic'
  | 'instagram_business_manage_messages'
  | 'instagram_business_manage_comments'
  | 'instagram_business_content_publish';

export interface RedirectParam {
  scope: Scope[];
  clientId: string;
  redirectUri: string;
  force_reauth?: boolean;
  state?: string;
}

export interface CreateContainerParam {
  image_url?: string;
  video_url?: string;
  media_type?: 'VIDEO' | 'REELS' | 'STORIES';
  is_carousel_item?: boolean;
  upload_type?: 'resumable';
}

export interface CreateCarouselContainerParam {
  children: Array<string | number> | string;
  media_type?: 'CAROUSEL';
}
