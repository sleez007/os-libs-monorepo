import { Injectable } from '@nestjs/common';
import { InstagramAccount } from '@innovatespace/ig-business';

const accessToken =
  'IGAANkhgXa0GxBZAE00ZA0hja1dDYkItc0Vhd0s3THRzSHVnN1UwN0Q4dDROTkxHTFJVd1hXOGpsT3pRTVAxVDdGclZAhZAEJIUmZArcjU1Y2oxT09OR3E4SkE5STB6cWV5d0N4eS1sUGNGakhpZAHRPRTRqYktn';

@Injectable()
export class InstagramAccountService {
  private readonly instagramAccount: InstagramAccount;

  constructor() {
    this.instagramAccount = new InstagramAccount(accessToken, 'v23.0');
  }

  async getUserData<T>(fields: string[] | string): Promise<T> {
    return this.instagramAccount.getUserData(fields);
  }
}
