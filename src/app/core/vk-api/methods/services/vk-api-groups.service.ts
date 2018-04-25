import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

import {Stp} from '../../../../shared/supports/safe-type-parser';
import {VkApiServiceAbstract} from './vk-api.service.abstract';
import {VkGroup} from '../models/vk-group.model';


@Injectable()
export class VkApiGroupsService extends VkApiServiceAbstract {

  protected METHOD_URL = 'groups.get';

  /** @override */
  protected getDefaultParams(): HttpParams {
    return super.getDefaultParams()
      .set('extended', '1');
  }

  getByUserId(userId: string): Observable<VkGroup[]> {
    const params = this.getDefaultParams()
      .set('user_id', userId);

    return this.httpJsonpGet(params).pipe(
      map(VkApiGroupsService._parseResponse)
    );
  }

  private static _parseResponse(res: object): VkGroup[] {
    return Stp.getIsHas(res, ['items'], Array, true)
      .map(VkGroup.parseItem);
  }

}
