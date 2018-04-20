import {Injectable} from '@angular/core';
import {VkTokenService} from '../../token/services/vk-token.service';

@Injectable()
export class VkCurrentUserService {

  constructor(private _tokenService: VkTokenService) {
  }

  getId(): string|null {
    return this._tokenService.getCurrentUserId();
  }

  logout() {
    this._tokenService.removeLocalToken();
  }

}
