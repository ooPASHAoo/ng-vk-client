import {VkTokenModel} from './models/vk-token.model';

const STORAGE_KEY = 'PG_VK_TOKEN_STORAGE_KEY';

export class VkTokenStorageService {

  /** @throws JSON.stringify(token) */
  saveToken(token: VkTokenModel) {
    const jsonToken = JSON.stringify(token);
    localStorage.setItem(STORAGE_KEY, jsonToken);
  }

  /** @throws JSON.parse(jsonToken) */
  getToken(): VkTokenModel | null  {
    const jsonToken = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(jsonToken);
  }

  removeToken() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
