import {HttpParams} from '@angular/common/http';
import {OAUTH_REDIRECT_URI} from './vk-oauth.const';
import {VK_APP_ID} from '../vk-api.const';

export class OauthVkService {

  public getAuthUrl(): string {
    const params = new HttpParams()
      .set('client_id', VK_APP_ID)
      .set('display', 'popup')
      .set('revoke', '1')
      .set('redirect_uri', OAUTH_REDIRECT_URI)
      .set('scope', 'friends')
      .set('response_type', 'token')
      .set('v', '5.74');

    return `https://oauth.vk.com/authorize?${params.toString()}`;
  }
}
