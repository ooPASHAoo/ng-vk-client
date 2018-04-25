import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VkTokenService} from '../../../../../core/vk-api/token/services/vk-token.service';
import {ApiError, eApiErrCode} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {PostsListService} from '../../../../../core/services/posts-list.service';
import {LoaderServiceDelegate} from '../../../../../core/services/abstracts/loader.service.abstract';
import {VkPostsList} from '../../../../../core/vk-api/methods/models/vk-posts-list.model';

@Component({
  selector: 'pg-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit, OnDestroy, LoaderServiceDelegate {

  get postsList(): VkPostsList|null {
    return this.postsService.postsList;
  }

  // isLoading = false;
  get isLoading(): boolean {
    return this.postsService.isLoading();
  }

  hasLoadError = false;
  userIdError = false;

  private readonly _loadScrollBottom = 3000;

  constructor(private _router: Router,
              public postsService: PostsListService) {
  }

  ngOnInit() {
    this.postsService.loaderDelegate = this;
    if (!this.postsService.postsList && this.postsService.userId) {
      this.postsService.load();
    }
  }

  ngOnDestroy(): void {
    this.postsService.loaderDelegate = null;
  }


  // --- actions --- //


  @HostListener('window:scroll')
  onScroll() {
    const scrollHeight = document.body.offsetHeight;
    const scrollBottom = window.innerHeight + window.scrollY;
    const scrollLeft = scrollHeight - scrollBottom;
    if (scrollLeft < this._loadScrollBottom) {
      this.postsService.load();
    }
  }

  onRefresh() {
    this.postsService.refresh();
  }


  // --- LoaderServiceDelegate --- //


  lsdChangeOwnerId(ownerId: string): void {
    this.userIdError = false;
    this.postsService.refresh();
  }

  lsdLoadInterceptor(ownerId: string): boolean {
    // this.isLoading = true;
    return true;
  }

  lsdSuccessHandler(newData: number): void {
    this.hasLoadError = false;
  }

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    this.hasLoadError = true;

    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else {
      // alert('Ошибка при загрузке записей на стене. Попробуйте еще раз.');
      console.warn('Ошибка при загрузке записей на стене. Попробуйте еще раз.');
    }

    if (err instanceof ApiError) {
      if (
        err.code === eApiErrCode.INVALID_ID ||
        err.code === eApiErrCode.ACCESS_DENIED ||
        err.code === eApiErrCode.DELETE_OR_BAN
      ) {
        this.userIdError = true;
      }

      // switch (err.code) {
      //   case eApiErrCode.INVALID_ID: {
      //     // this.errorMsg = 'Несуществующий id пользователя.';
      //     console.log('Несуществующий id пользователя.');
      //     break;
      //   }
      //   case eApiErrCode.ACCESS_DENIED: {
      //     // this.errorMsg = 'Доступ запрещен.';
      //     console.log('Доступ запрещен.');
      //     break;
      //   }
      //   case eApiErrCode.DELETE_OR_BAN: {
      //     // this.errorMsg = 'Страница удалена или заблокирована.';
      //     console.log('Страница удалена или заблокирована.');
      //     break;
      //   }
      // }
    }

  }

  lsdFinallyHandler(): void {
    // this.isLoading = false;
  }

}
