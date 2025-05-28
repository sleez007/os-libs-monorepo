import {
  FileUploadSource,
  PostPhotoParam,
  PostVideoParam,
  PublishResponse,
  PublishUploadParam,
  QueryCreatorInfoResponse,
  UploadPayload,
} from '../../common/types';
import {
  publishImageContent,
  publishVideoContent,
  queryCreatorInfo,
  uploadVideoToTikTokServer,
} from '../../api/content';
import { extractChunkUploadPlan } from '../../common/util';

export class ContentPublishTicTok {
  constructor(private readonly token: string) {}

  async queryCreatorInfo(): Promise<QueryCreatorInfoResponse> {
    return queryCreatorInfo({ accessToken: this.token });
  }

  async publishImageContent(post: PostPhotoParam): Promise<PublishResponse> {
    return publishImageContent({ accessToken: this.token, post });
  }

  async publishVideoPullFromUrlContent(
    post: PostVideoParam
  ): Promise<PublishResponse> {
    return publishVideoContent({ accessToken: this.token, post });
  }

  async publishVideoFileUploadContent({
    post_info,
    buffer,
    mimeType,
  }: PublishUploadParam): Promise<PublishResponse> {
    const { total_chunk_count, chunk_size, size, chunks } =
      extractChunkUploadPlan(buffer);

    const source_info: FileUploadSource = {
      source: 'FILE_UPLOAD',
      video_size: size,
      chunk_size,
      total_chunk_count,
    };
    const post: PostVideoParam = {
      post_info,
      source_info,
    };

    const publishResponse = await publishVideoContent({
      accessToken: this.token,
      post,
    });
    return { ...publishResponse, chunks, mimeType };
  }

  async uploadVideoToTikTokServer(dto: UploadPayload) {
    return this.doTheCalms(dto);
  }

  async doTheCalms({
    buffer,
    mimeType,
    uploadUrl,
    chunks: defaultChunks = [],
  }: UploadPayload) {
    let chunksToUpload = defaultChunks;
    if (defaultChunks.length === 0) {
      const { chunks } = extractChunkUploadPlan(buffer);
      chunksToUpload = chunks;
    }

    const uploads = [];
    for (const chunk of chunksToUpload) {
      const { start, end, contentRange } = chunk;
      const chunkBytes = buffer.subarray(start, end + 1);
      const headers = {
        'Content-Type': mimeType,
        'Content-Length': chunkBytes.length.toString(),
        'Content-Range': contentRange,
      };
      const response = await uploadVideoToTikTokServer({
        uploadUrl,
        fileBuffer: chunkBytes,
        headers,
      });

      uploads.push(response);
    }

    return {
      uploads,
      chunks: chunksToUpload.length,
    };
  }

  async publishAndUploadVideo({
    post_info,
    buffer,
    mimeType,
  }: PublishUploadParam) {
    const { chunks, data, error } = await this.publishVideoFileUploadContent({
      post_info,
      buffer,
      mimeType,
    });

    const uploadUrl = data.upload_url as string;
    const { uploads } = await this.doTheCalms({
      uploadUrl,
      buffer,
      mimeType,
      chunks,
    });

    return {
      publishResponse: {
        data,
        error,
      },
      uploads,
    };
  }
}
