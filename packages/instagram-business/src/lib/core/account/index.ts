import { ENDPOINTS } from '../../internals/constants';
import { requestHelper } from '../../service';

export class InstagramAccount {
  constructor(
    private readonly accessToken: string,
    private readonly version = 'v23.0'
  ) {}

  async getUserData<T>(fields: string[] | string): Promise<T> {
    const params = new URLSearchParams({
      fields: Array.isArray(fields) ? fields.join(',') : fields,
      access_token: this.accessToken,
    });
    const url = `${ENDPOINTS.accountEndPoint}/${
      this.version
    }/me?${params.toString()}`;
    const response = await requestHelper<T>({
      url,
      method: 'GET',
    });
    return response;
  }
}
