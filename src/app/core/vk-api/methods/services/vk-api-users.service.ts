import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {VkUser} from '../models/vk-user.model';

@Injectable()
export class VkApiUsersService extends VkApiServiceAbstract {

  protected METHOD_URL = 'users.get';

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('fields', 'photo_200,photo_100,bdate,city,country,counters,domain');
  }

  getById(userId: string): Observable<VkUser> {
    const params = this.getDefaultParams()
      .set('user_id', userId);

    return this.httpJsonpGet(params).pipe(
      map(VkApiUsersService._parseResponse)
    );
  }

  private static _parseResponse(res: Array<object>): VkUser {
    return VkUser.parseItem(res[0]);
  }

}
