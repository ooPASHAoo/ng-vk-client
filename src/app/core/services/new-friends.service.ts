import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {LoaderServiceAbstract} from './abstracts/loader.service.abstract';
import {VkUser} from '../vk-api/methods/models/vk-user.model';
import {VkApiFriendsService} from '../vk-api/methods/services/vk-api-friends.service';

@Injectable()
export class FriendsService extends LoaderServiceAbstract<VkUser[]> {

  constructor(private _vkFriendsService: VkApiFriendsService) {
    super();
  }

  /** Read only */
  get friends(): VkUser[]|null {
    return this._data;
  }

  // --- LoaderServiceAbstract --- //

  protected _dataLoader(): Observable<VkUser[]> {
    return this._vkFriendsService.getByUserId(this._ownerId);
  }

  protected _dataLength(data: VkUser[]): number {
    return data.length;
  }

  protected _dataConcat(newData: VkUser[]): void {
    this._data = newData;
  }

}

/**
 * У VK-API максимальное количество возвращаемых друзей 5000.
 * Но это учебный проект и для отличия от posts-list.service
 * я сделал типа они возвращаются сразу все.
 */
