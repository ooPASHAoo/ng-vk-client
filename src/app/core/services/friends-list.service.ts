import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {LoaderServiceAbstract} from './abstracts/loader.service.abstract';
import {VkUser} from '../vk-api/methods/models/vk-user.model';
import {VkApiFriendsService} from '../vk-api/methods/services/vk-api-friends.service';
import {LoaderListServiceAbstract} from './abstracts/loader-list.service.abstract';
import {map} from 'rxjs/operators';

@Injectable()
export class FriendsListService extends LoaderListServiceAbstract<VkUser[]> {

  constructor(private _vkFriendsService: VkApiFriendsService) {
    super();
    this._setCount(30);
  }

  /** Read only */
  get friends(): VkUser[]|null {
    return this._data;
  }

  // --- LoaderServiceAbstract --- //

  protected _dataIsEnd(newData: VkUser[]): boolean {
    return false;
  }

  protected _dataLoader(): Observable<VkUser[]> {
    return this._vkFriendsService.getFriends(this._ownerId, this._offset, this._count);
  }

  protected _dataLength(data: VkUser[]): number {
    return data.length;
  }

  protected _dataConcat(newData: VkUser[]): void {
    if (this._data) {
      this._data.push(...newData);
    } else if (newData && newData.length) {
      this._data = newData;
    }
  }

}
