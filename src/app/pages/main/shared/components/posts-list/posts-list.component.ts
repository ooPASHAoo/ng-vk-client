import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {VkApiWallService} from '../../../../../core/vk-api/methods/services/vk-api-wall.service';
import {ApiError} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {VkPostsList} from '../../../../../core/vk-api/methods/models/vk-posts-list.model';
import {StpError} from '../../../../../shared/supports/safe-type-parser';

@Component({
  selector: 'pg-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  @Input() ownerId: string;

  postsList: VkPostsList|null;
  isLoading = false;
  hasLoadError = false;

  private _offset = 0;
  private _isPostsEnd = false;
  private readonly _count = 20;

  private readonly _loadScrollBottom = 3000;

  constructor(private _router: Router,
              private _vkWallService: VkApiWallService) {
  }

  ngOnInit() {
    // console.log('- PG:', this.ownerId);
    this._refresh();
  }

  // --- actions --- //

  @HostListener('window:scroll')
  onScroll() {
    const scrollHeight = document.body.offsetHeight;
    const scrollBottom = window.innerHeight + window.scrollY;
    const scrollLeft = scrollHeight - scrollBottom;
    if (scrollLeft < this._loadScrollBottom) {
      this._loadMorePosts();
    }
  }

  onRefresh() {
    this._refresh();
  }

  // --- private --- //

  private _refresh() {
    this.postsList = null;
    this._offset = 0;
    this._isPostsEnd = false;
    this._loadMorePosts();
  }

  private _loadMorePosts(): boolean {
    if (this.isLoading || this._isPostsEnd) {
      return false;
    }

    let count = this._count;
    if (this.postsList) {
      const leftPosts = this.postsList.maxCount - this._offset;
      if (leftPosts <= 0) {
        return false;
      }
      if (leftPosts < count) {
        count = leftPosts;
      }
    }

    this._loadWallPostsList(this.ownerId, this._offset, count);
    return true;
  }

  // --- core --- //

  private _loadWallPostsList(ownerId: string, offset: number, count: number) {
    this.isLoading = true;
    this.hasLoadError = false;

    this._vkWallService.getPosts(ownerId, offset, count)
      .subscribe(
        this._responseSuccessHandler.bind(this),
        this._responseFailureHandler.bind(this)
      );
  }

  private _responseSuccessHandler(res: VkPostsList) {
    this.isLoading = false;

    if (this.postsList) {
      VkPostsList.assign(this.postsList, res);
    } else {
      this.postsList = res;
    }

    this._offset += res.posts.length;
    if (this._offset >= this.postsList.maxCount) {
      this._isPostsEnd = true;
    }
  }

  private _responseFailureHandler(err: ApiError|AuthVkError|Error) {
    this.isLoading = false;
    this.hasLoadError = true;

    console.warn(`- PG: ${err.name} - ${err.message}`);
    if (err instanceof StpError) {
      console.dir(err.parseObject);
    }

    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else {
      alert('Ошибка при загрузке записей на стене. Попробуйте еще раз.');
    }
  }

  // onScrollPosts(event) {
  //   console.log('- PG:', 'scroll', event);
  // }
}
