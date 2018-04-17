import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {User} from '../models/user.model';


@Injectable()
export class VkApiFriendsService extends VkApiServiceAbstract {

  protected METHOD_URL = 'friends.get';

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('order', 'hints')
      .set('fields', 'photo_100,country,city');
  }


  // === public methods === //


  getByUserId(userId: string): Observable<User[]> {
    const params = this.getDefaultParams()
      .set('user_id', userId);

    return this.httpJsonpGet(params).pipe(
      map(this._parseResponse)
    );
  }

  // --- private --- //

  private _parseResponse(res: object): User[] {
    const friendsItemsList: Array<object>|null = res['items'];
    if (!friendsItemsList) {
      throw new Error('Friends items is empty');
    }

    // Парсит объекты в модели|null и фильтрует(Null) приводя к bool
    const friendsList = friendsItemsList.map(User.parseResponse).filter(Boolean);
    if (!friendsList) {
      throw new Error('Friends is empty');
    }

    return friendsList;
  }

}
