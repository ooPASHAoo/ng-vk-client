import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {WallPost} from '../models/wall-post.model';

@Injectable()
export class VkApiWallService extends VkApiServiceAbstract {

  protected METHOD_URL = 'wall.get';

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('order', 'hints')
      .set('count', '100')
      .set('fields', 'photo_100,country,city');
  }


  // === public methods === //


  getByOwnerId(ownerId: string): Observable<WallPost[]> {
    const params = this.getDefaultParams()
      .set('owner_id', ownerId);

    return this.httpJsonpGet(params).pipe(
      map(this._parseResponse)
    );
  }

  // --- private --- //

  private _parseResponse(res: object): WallPost[] {
    const postItemsList: Array<object>|null = res['items'];
    if (!postItemsList) {
      throw new Error('Wall posts items is empty');
    }

    // Парсит объекты в модели|null и фильтрует(Null) приводя к bool
    const postsList = postItemsList.map(WallPost.parseItem).filter(Boolean);
    if (!postsList) {
      throw new Error('Wall posts is empty');
    }

    return postsList;
  }

}

