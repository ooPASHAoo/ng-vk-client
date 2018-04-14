import {HttpParams} from '@angular/common/http';
import {OAUTH_REDIRECT_URI} from './vk-oauth.const';
import {VK_APP_ID} from '../vk-api.const';

export class OauthVkService {

  /** redirect with result to OAUTH_REDIRECT_URI */
  public showPopupAuth(): Window {
    const width = 720;
    const height = 360;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    const windowOptions = `width=${width},height=${height},top=${top},left=${left}`;

    const oauthLink = this._getAuthUrl();

    return window.open(oauthLink, 'OAuthVK', windowOptions);
  }

  private _getAuthUrl(): string {
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
