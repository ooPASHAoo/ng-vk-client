import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {User} from '../models/user.model';

@Injectable()
export class VkApiUsersService extends VkApiServiceAbstract {

  protected METHOD_URL = 'users.get';

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('fields', 'photo_200_orig,photo_100,bdate,city,country,nickname,counters');
  }


  // === public methods === //


  getById(userId: string): Observable<User> {
    const params = this.getDefaultParams()
      .set('user_id', userId);

    return this.httpJsonpGet(params).pipe(
      map(this._parseResponse)
    );
  }

  // --- private --- //

  private _parseResponse(res: Array<object>): User {
    const user = User.parseResponse(res[0]);
    if (!user) {
      throw new Error('User is empty');
    }

    return user;
  }

}
