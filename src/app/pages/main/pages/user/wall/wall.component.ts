import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ApiError, eApiErrCode} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {PostsListService} from '../../../shared/services/posts-list.service';
import {LoaderServiceDelegate} from '../../../shared/services/abstracts/loader.service.abstract';
import {VkPostsList} from '../../../../../core/vk-api/methods/models/vk-posts-list.model';


@Component({
  selector: 'pg-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy, LoaderServiceDelegate {

  get postsList(): VkPostsList|null { return this._postsService.postsList; }

  get isLoading(): boolean { return this._postsService.isLoading(); }

  get hasLoadError(): boolean { return this._postsService.hasLoadError; }

  private readonly _loadScrollBottom = 3000;


  constructor(private _router: Router,
              private _postsService: PostsListService) {}

  ngOnInit() {
    this._postsService.loaderDelegate = this;
    if (!this.postsList && !this.isLoading && this._postsService.userId) {
      this._postsService.refresh();
    }
  }

  ngOnDestroy(): void {
    this._postsService.loaderDelegate = null;
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollHeight = document.body.offsetHeight;
    const scrollBottom = window.innerHeight + window.scrollY;
    const scrollLeft = scrollHeight - scrollBottom;
    if (scrollLeft < this._loadScrollBottom) {
      if (!this.isLoading && this._postsService.userId) {
        this._postsService.load();
      }
    }
  }

  /** UI-Action */
  onRefresh() {
    this._postsService.refresh();
  }


  // --- LoaderServiceDelegate --- //


  lsdChangeOwnerId(ownerId: string): void {
    if (ownerId) {
      this._postsService.refresh();
    }
  }

  lsdLoadInterceptor(ownerId: string): boolean { return true; }

  lsdSuccessHandler(newData: number): void {}

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    }
  }

  lsdFinallyHandler(): void {}

}
