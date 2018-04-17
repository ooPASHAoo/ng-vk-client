import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {WallPost} from '../models/wall-post.model';
import {User} from '../models/user.model';
import {Group} from '../models/group.model';
import {WallPostsList} from '../models/wall-posts-list.model';

@Injectable()
export class VkApiWallService extends VkApiServiceAbstract {

  protected METHOD_URL = 'wall.get';

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('order', 'hints')
      .set('count', '100')
      .set('extended', '1')
      .set('fields', 'photo_100');
  }


  // === public methods === //


  getByOwnerId(ownerId: string): Observable<WallPostsList> {
    const params = this.getDefaultParams()
      .set('owner_id', ownerId);

    return this.httpJsonpGet(params).pipe(
      map(this._parseResponse)
    );
  }

  // --- private --- //

  private _parseResponse(res: object): WallPostsList {
    const postsList = WallPostsList.parseItem(res);
    if (!postsList) {
      throw new Error('Wall posts list is empty');
    }

    return postsList;
  }

}

