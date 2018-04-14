import {Injectable} from '@angular/core';

import {VkTokenModel} from '../models/vk-token.model';

const STORAGE_KEY = 'PG_VK_TOKEN_STORAGE_KEY';

@Injectable()
export class VkTokenStorageService {

  /** @throws JSON.stringify(token) */
  saveToken(token: VkTokenModel) {
    const jsonToken = JSON.stringify(token);
    localStorage.setItem(STORAGE_KEY, jsonToken);
  }

  /** @throws JSON.parse(jsonToken) */
  getToken(): VkTokenModel|null {
    const jsonToken = localStorage.getItem(STORAGE_KEY);
    return this._tokenFromJson(jsonToken);
  }

  removeToken() {
    localStorage.removeItem(STORAGE_KEY);
  }

  // --- private --- //

  private _tokenFromJson(jsonToken: string): VkTokenModel|null {
    const objToken = JSON.parse(jsonToken) as VkTokenModel;
    if (!objToken || !objToken.token || !objToken.expires || !objToken.userId) {
      return null;
    }

    objToken.expires = new Date(objToken.expires);
    if (isNaN(objToken.expires.getTime())) {
      return null;
    }

    return new VkTokenModel(objToken.token, objToken.expires, objToken.userId);
  }

}
