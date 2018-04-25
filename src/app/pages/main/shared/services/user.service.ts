import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {LoaderServiceAbstract} from './abstracts/loader.service.abstract';
import {VkUser} from '../../../../core/vk-api/methods/models/vk-user.model';
import {VkApiUsersService} from '../../../../core/vk-api/methods/services/vk-api-users.service';


@Injectable()
export class UserService extends LoaderServiceAbstract<VkUser> {

  /** Read only */
  get user(): VkUser|null {
    return this._data;
  }


  constructor(private _vkUsersService: VkApiUsersService) {
    super();
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
