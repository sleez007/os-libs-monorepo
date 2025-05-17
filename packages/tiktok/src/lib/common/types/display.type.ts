export interface ListVideoParam {
  cursor?: number;
  max_count?: number;
}

export interface QueryVideoParam {
  filters: {
    video_ids: string[];
  };
}
