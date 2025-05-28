import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { type IUploader, TiktokService } from './tiktok.service';
import type {
  PostPhotoParam,
  PostVideoParam,
  UploadPayload,
} from '@innovate/tiktok';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('publish')
export class PublishController {
  constructor(private readonly tiktokService: TiktokService) {}

  @Post('query-creator-info')
  queryCreatorInfo(@Body() body: { token: string }) {
    return this.tiktokService.queryCreatorInfo(body.token);
  }

  @Post('publish-image-content')
  publishImageContent(@Body() body: { token: string; post: PostPhotoParam }) {
    return this.tiktokService.publishImageContent(body.token, body.post);
  }

  @Post('publish-video-content')
  publishVideoContent(@Body() body: { token: string; post: PostVideoParam }) {
    return this.tiktokService.publishVideoContent(body.token, body.post);
  }

  createContentRangeHeader(fileBuffer: Buffer | Blob) {
    const totalBytes =
      fileBuffer instanceof Blob ? fileBuffer.size : fileBuffer.length;

    const firstByte = 0;
    const lastByte = totalBytes - 1;

    return {
      size: totalBytes,
      range: `bytes ${firstByte}-${lastByte}/${totalBytes}`,
    };
  }

  @Post('publish-video-file-upload')
  @UseInterceptors(FileInterceptor('file'))
  publishVideoFileUpload(
    @Body() body: { token: string; post: string },
    @UploadedFile()
    file: IUploader
  ) {
    return this.tiktokService.publishVideoFileUpload(
      body.token,
      JSON.parse(body.post),
      file
    );
  }

  @Post('upload-video-to-tiktok-server')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body()
    body: {
      uploadUrl: string;
    },
    @UploadedFile()
    file: IUploader
  ) {
    const { uploadUrl } = body;
    const { buffer, mimetype } = file;

    const data: UploadPayload = {
      uploadUrl,
      buffer: buffer,
      mimeType: mimetype,
    };
    return this.tiktokService.uploadVideoToTikTokServer(data);
  }

  @Post('publish-and-upload-video')
  @UseInterceptors(FileInterceptor('file'))
  publishAndUploadVideo(
    @Body() body: { token: string; post: string },
    @UploadedFile()
    file: IUploader
  ) {
    console.log('body is', body);
    return this.tiktokService.publishAndUploadVideo(
      body.token,
      JSON.parse(body.post),
      file
    );
  }
}
