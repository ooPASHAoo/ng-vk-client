import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {LoaderServiceAbstract} from './abstracts/loader.service.abstract';
import {VkUser} from '../vk-api/methods/models/vk-user.model';
import {VkApiUsersService} from '../vk-api/methods/services/vk-api-users.service';

@Injectable()
export class UserService extends LoaderServiceAbstract<VkUser> {

  constructor(private _vkUsersService: VkApiUsersService) {
    super();
  }

  /** Read only */
  get user(): VkUser|null {
    return this._data;
  }

  // --- LoaderServiceAbstract --- //

  protected _dataLoader(): Observable<VkUser> {
    return this._vkUsersService.getById(this._ownerId);
  }

  protected _dataLength(data: VkUser): number {
    return 1;
  }

  protected _dataConcat(newData: VkUser): void {
    this._data = newData;
  }

}
