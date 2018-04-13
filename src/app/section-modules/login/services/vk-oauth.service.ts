import {HttpParams} from '@angular/common/http';

export const OAUTH_EVENT = 'PGOAuthResult';

/** VK App id */
const client_id = '6446573';
/** VK App settings */
const redirect_uri = 'http://localhost:4200/login/oauth-callback';

export class OauthVkService {

  public getAuthUrl(): string {
    const params = new HttpParams()
      .set('client_id', client_id)
      .set('display', 'popup')
      .set('revoke', '1')
      .set('redirect_uri', redirect_uri)
      .set('scope', 'friends')
      .set('response_type', 'token')
      .set('v', '5.74');

    return `https://oauth.vk.com/authorize?${params.toString()}`;
  }
}
