import {Injectable} from '@angular/core';

import {VkTokenModel} from '../models/vk-token.model';
import {VkTokenStorageService} from './vk-token-storage.service';

@Injectable()
export class VkTokenService {

  constructor(private _tokenStorage: VkTokenStorageService) {
  }

  isHasActualLocalToken(): boolean {
    return !!this.getActualLocalToken();
  }

  getCurrentUserId(): string|null {
    const token = this._getLocalToken();
    return token ? token.userId : null;
  }

  getActualLocalToken(): VkTokenModel|null {
    const token = this._getLocalToken();
    if (!token || this._isExpired(token)) {
      return null;
    }
    return token;
  }

  removeLocalToken() {
    this._tokenStorage.removeToken();
  }

  private _getLocalToken(): VkTokenModel|null {
    try {
      return this._tokenStorage.getToken();
    } catch (err) {
      return null;
    }
  }

  private _isExpired(token: VkTokenModel): boolean {
    if (!token || !token.expires || !(token.expires instanceof Date)) {
      return true;
    }

    const nowTime = (new Date()).getTime();
    const expiredTime = token.expires.getTime();
    const timeLeft = expiredTime - nowTime;

    return (timeLeft <= 0);
  }

}
