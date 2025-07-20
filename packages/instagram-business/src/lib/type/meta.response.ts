export interface CodeExchangeResponse {
  data: {
    access_token: string;
    user_id: string;
    scope: string;
  };
}

export interface TokenExchangeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface CreateContainerResponse {
  id: string;
}

export interface PublishContainerResponse {
  id: string;
}
