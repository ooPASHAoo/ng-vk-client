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

  getCurrentUserId(): string {
    const token = this._getLocalToken();
    return token ? token.userId : null;
  }

  getActualLocalToken() {
    const token = this._getLocalToken();
    return (!this._isExpired(token)) ? token : null;
  }

  removeLocalToken() {
    this._tokenStorage.removeToken();
  }

  private _getLocalToken() {
    // TODO: Different error. TokenError->expired
    try {
      return this._tokenStorage.getToken();
    } catch (err) {
      return null;
    } finally {
    }
  }

  private _isExpired(token: VkTokenModel): boolean {
    const now = new Date();
    const timeLeft = token.expires.getTime() - now.getTime();
    return timeLeft <= 0;
  }
}
