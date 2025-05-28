import type {
  ExchangeTokenParam,
  OauthParam,
  RefreshTokenParam,
  RevokeTokenParam,
} from '@innovatespace/tiktok';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TiktokService } from './tiktok.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly tiktokService: TiktokService) {}
  @Post('refresh-token')
  refreshToken(@Body() body: RefreshTokenParam) {
    return this.tiktokService.refreshToken(body);
  }

  @Post('revoke-token')
  revokeToken(@Body() body: RevokeTokenParam) {
    return this.tiktokService.revokeToken(body);
  }

  @Post('oauth')
  oauth(@Body() body: OauthParam) {
    return this.tiktokService.oauth(body);
  }

  @Get('callback')
  callback(
    @Query()
    query: {
      code: string;
      state: string;
      error?: string;
      error_description?: string;
    }
  ) {
    console.log(query);
    const { code, state, error, error_description } = query;
    if (error) {
      return {
        error,
        error_description,
      };
    }
    const body: ExchangeTokenParam = {
      code,
      grant_type: 'authorization_code',
      code_verifier: state,
      redirect_uri:
        'https://0171-197-210-52-66.ngrok-free.app/api/auth/callback',
    };
    return this.tiktokService.exchangeCodeForToken(body);
  }

  @Post('callback')
  exchangeCodeForToken(@Body() body: ExchangeTokenParam) {
    return this.tiktokService.exchangeCodeForToken(body);
  }
}
