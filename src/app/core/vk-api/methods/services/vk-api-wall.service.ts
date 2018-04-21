import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {VkPostsList} from '../models/vk-posts-list.model';

@Injectable()
export class VkApiWallService extends VkApiServiceAbstract {

  protected METHOD_URL = 'wall.get';

  readonly MAX_COUNT = 100;

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('order', 'hints')
      .set('extended', '1')
      .set('fields', 'photo_100');
  }

  getPosts(ownerId: string, offset: number, count: number): Observable<VkPostsList> {
    const params = this.getDefaultParams()
      .set('owner_id', ownerId)
      .set('count', count.toString())
      .set('offset', Math.min(offset, this.MAX_COUNT).toString());

    return this.httpJsonpGet(params).pipe(
      map(VkApiWallService._parseResponse)
    );
  }

  private static _parseResponse(res: object): VkPostsList {
    return VkPostsList.parseItem(res);
  }

}

