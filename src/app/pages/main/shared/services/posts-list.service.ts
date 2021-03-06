import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {VkPostsList} from '../../../../core/vk-api/methods/models/vk-posts-list.model';
import {VkApiWallService} from '../../../../core/vk-api/methods/services/vk-api-wall.service';
import {LoaderListServiceAbstract} from './abstracts/loader-list.service.abstract';


@Injectable()
export class PostsListService extends LoaderListServiceAbstract<VkPostsList> {


  // --- getters --- //

  /** Read only */
  get postsList(): VkPostsList|null {
    return this._data;
  }

  // /** Read only */
  // get posts(): VkPost[]|null {
  //   return (this._data) ? this._data.posts : null;
  // }

  // /** Read only */
  // get relatedUsers(): { [userId: string]: VkUser }|null {
  //   return (this._data) ? this._data.relatedUsers : null;
  // }

  // /** Read only */
  // get relatedGroups(): { [groupId: string]: VkGroup }|null {
  //   return (this._data) ? this._data.relatedGroups : null;
  // }


  constructor(private _vkWallService: VkApiWallService) {
    super();
  }


  // --- LoaderListServiceAbstract --- //


  protected _dataLoader(): Observable<VkPostsList> {
    return this._vkWallService.getPosts(this._ownerId, this._offset, this._count);
  }

  protected _dataLength(data: VkPostsList): number {
    return data.posts.length;
  }

  protected _dataIsEnd(newData: VkPostsList): boolean {
    return (this._offset >= newData.maxCount);
  }

  protected _dataConcat(newData: VkPostsList): void {
    if (this._data) {
      VkPostsList.assign(this._data, newData);
    } else if (newData) {
      this._data = newData;
    }
  }

}
