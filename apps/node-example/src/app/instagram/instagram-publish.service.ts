import { Injectable } from '@nestjs/common';
import {
  InstagramPublish,
  CreateContainerParam,
  CreateCarouselContainerParam,
} from '@innovatespace/ig-business';

const accessToken =
  'IGAANkhgXa0GxBZAE00ZA0hja1dDYkItc0Vhd0s3THRzSHVnN1UwN0Q4dDROTkxHTFJVd1hXOGpsT3pRTVAxVDdGclZAhZAEJIUmZArcjU1Y2oxT09OR3E4SkE5STB6cWV5d0N4eS1sUGNGakhpZAHRPRTRqYktn';
const userId = '24484102424516690';

@Injectable()
export class InstagramPublishService {
  private readonly instagramPublish: InstagramPublish;
  constructor() {
    this.instagramPublish = new InstagramPublish(accessToken, userId);
  }

  async createContainer(dto: CreateContainerParam) {
    return this.instagramPublish.createContainer(dto);
  }

  async createCarouselContainer(dto: CreateCarouselContainerParam) {
    return this.instagramPublish.createCarouselContainer(dto);
  }

  async publishContainer(containerId: string) {
    return this.instagramPublish.publishContainer(containerId);
  }
}
