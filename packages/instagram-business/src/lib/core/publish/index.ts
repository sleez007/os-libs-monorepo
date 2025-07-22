import { ENDPOINTS } from '../../internals/constants';
import {
  CreateContainerParam,
  CreateContainerResponse,
  CreateCarouselContainerParam,
  PublishContainerResponse,
} from '../../type';
import { requestHelper } from '../../service';

export class InstagramPublish {
  constructor(
    private readonly accessToken: string,
    private readonly accountId: string,
    private readonly version = 'v23.0'
  ) {}

  async createContainer(
    dto: CreateContainerParam
  ): Promise<CreateContainerResponse> {
    if (!dto?.image_url && !dto?.video_url) {
      throw new Error('image_url or video_url is required');
    }
    if (dto?.image_url && dto?.video_url) {
      throw new Error('Please provide either image_url or video_url');
    }
    let dtoCopy: CreateContainerParam = {};

    if (dto?.video_url) {
      dtoCopy = {
        ...dto,
        ...(dto?.upload_type && { upload_type: dto.upload_type }),
        media_type: dto.media_type || 'VIDEO',
        is_carousel_item: dto.is_carousel_item || false,
        video_url: dto.video_url,
      };
    }
    if (dto?.image_url) {
      dtoCopy = {
        ...dto,
        ...(dto?.upload_type && { upload_type: dto.upload_type }),
        is_carousel_item: dto.is_carousel_item || false,
        image_url: dto.image_url,
      };
    }
    const url = `${ENDPOINTS.publishEndPoint}/${this.version}/${this.accountId}/media`;
    const response = await requestHelper<CreateContainerResponse>({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(dtoCopy),
    });
    return response;
  }

  async createCarouselContainer(
    dto: CreateCarouselContainerParam
  ): Promise<CreateContainerResponse> {
    const url = `${ENDPOINTS.publishEndPoint}/${this.version}/${this.accountId}/media`;
    const response = await requestHelper<CreateContainerResponse>({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(dto),
    });
    return response;
  }

  async publishContainer(
    creationId: string
  ): Promise<PublishContainerResponse> {
    const url = `${ENDPOINTS.publishEndPoint}/${this.version}/${this.accountId}/media_publish`;
    const response = await requestHelper<PublishContainerResponse>({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify({ creation_id: creationId }),
    });
    return response;
  }
}
