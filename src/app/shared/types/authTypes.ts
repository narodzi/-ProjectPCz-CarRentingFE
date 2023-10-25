export interface KeyCloakTokenResult {
  success: boolean;
  token: string | undefined;
}

export interface KeyCloakConstructorParams {
  url: string;
  realm: string;
  clientId: string;
  'ssl-required': 'external';
  'public-client': boolean;
  resource: string;
  'auth-server-url': string;
  'confidential-port': number;
  logoutUrl: string;
  redirect_uri: string;
}

