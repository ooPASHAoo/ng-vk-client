import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {VkUser} from '../models/vk-user.model';
import {Stp} from '../../../../shared/supports/safe-type-parser';

@Injectable()
export class VkApiFriendsService extends VkApiServiceAbstract {

  protected METHOD_URL = 'friends.get';

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('order', 'hints')
      .set('fields', 'photo_100,country,city');
  }

  getByUserId(userId: string): Observable<VkUser[]> {
    const params = this.getDefaultParams()
      .set('user_id', userId);

    return this.httpJsonpGet(params).pipe(
      map(VkApiFriendsService._parseResponse)
    );
  }

  private static _parseResponse(res: object): VkUser[] {
    return Stp.getIsHas(res, ['items'], Array, true)
      .map(VkUser.parseItem);
  }

}
