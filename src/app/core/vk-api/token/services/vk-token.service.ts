import {Injectable} from '@angular/core';

import {VkTokenModel} from '../models/vk-token.model';
import {VkTokenStorageService} from './vk-token-storage.service';

@Injectable()
export class VkTokenService {

  constructor(private _tokenStorage: VkTokenStorageService) {
  }

  getActualLocalToken() {
    // TODO: Different error. TokenError->expired
    try {
      const token = this._tokenStorage.getToken();
      return (this._isExpired(token)) ? null : token;
    } catch (err) {
      return null;
    } finally {
    }
  }

  removeLocalToken() {
    this._tokenStorage.removeToken();
  }

  private _isExpired(token: VkTokenModel): boolean {
    const now = new Date();
    const timeLeft = token.expires.getTime() - now.getTime();
    return timeLeft <= 0;
  }
}
