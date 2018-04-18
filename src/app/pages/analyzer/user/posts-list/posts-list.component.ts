import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {VkApiWallService} from '../../../../core/vk-api/methods/services/vk-api-wall.service';
import {ApiError} from '../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../core/vk-api/methods/errors/token-error';
import {VkPostsList} from '../../../../core/vk-api/methods/models/vk-posts-list.model';
import {StpError} from '../../../../shared/supports/safe-type-parser';

@Component({
  selector: 'pg-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  @Input() ownerId: string;

  postsList: VkPostsList;
  isLoaded = false;
  hasLoadError = false;

  constructor(private _router: Router,
              private _vkWallService: VkApiWallService) {
  }

  ngOnInit() {
    this._refresh();
  }

  // --- actions --- //

  onRefresh() {
    this._refresh();
  }

  // --- private --- //

  private _refresh() {
    this._loadWallPostsList(this.ownerId);
  }

  private _loadWallPostsList(ownerId: string) {
    this.isLoaded = false;
    this.hasLoadError = false;

    this._vkWallService.getByOwnerId(ownerId)
      .subscribe(
        this._responseSuccessHandler.bind(this),
        this._responseFailureHandler.bind(this)
      );
  }

  private _responseSuccessHandler(res: VkPostsList) {
    this.postsList = res;

    this.isLoaded = true;
  }

  private _responseFailureHandler(err: ApiError|AuthVkError|Error) {
    console.warn(`- PG: ${err.name} - ${err.message}`);
    if (err instanceof StpError) {
      console.dir(err.parseObject);
    }

    this.hasLoadError = true;

    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else {
      alert('Ошибка при загрузке записей на стене. Попробуйте еще раз.');
    }

    this.isLoaded = true;
  }

}
