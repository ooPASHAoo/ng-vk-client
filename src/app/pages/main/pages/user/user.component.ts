import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PostsListService} from '../../shared/services/posts-list.service';
import {UserService} from '../../shared/services/user.service';
import {LoaderServiceDelegate} from '../../shared/services/abstracts/loader.service.abstract';
import {VkUser} from '../../../../core/vk-api/methods/models/vk-user.model';
import {ApiError, eApiErrCode} from '../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../core/vk-api/methods/errors/token-error';
import {FriendsListService} from '../../shared/services/friends-list.service';
import {VkCurrentUserService} from '../../../../core/vk-api/methods/services/vk-current-user.service';


@Component({
  selector: 'pg-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    PostsListService,
    FriendsListService,
    UserService
  ]
})
export class UserComponent implements OnInit, LoaderServiceDelegate {

  userId: string;
  userNumId: string;

  get user(): VkUser { return this._userService.user; }

  get hasLoadError(): boolean { return this._userService.hasLoadError; }

  get isLoading(): boolean { return this._userService.isLoading(); }

  errorMsg = '';


  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _currentUser: VkCurrentUserService,
              private _userService: UserService,
              private _postsService: PostsListService,
              private _friendsService: FriendsListService) {}

  ngOnInit() {
    this._userService.loaderDelegate = this;

    this._activatedRoute.paramMap
      .subscribe((paramMap) => {

        const userIdParam = paramMap.get('id');
        if (userIdParam === this._currentUser.getId()) {
          const url = this._activatedRoute.snapshot.children
            .reduce((sum, v) => sum + v.url.join(''), '/im');
          this._router.navigate([url]);
          return;
        }

        this.changeUserId(userIdParam);
      });
  }

  changeUserId(userId: string) {
    this.userId = userId;
    this.userNumId = (userId === 'im') ? this._currentUser.getId() : userId;

    this._postsService.reset();
    this._friendsService.reset();
    this._userService.reset();

    this._userService.changeOwnerId(this.userNumId);
  }

  /** UI-Action */
  onRefresh() {
    this._userService.refresh();
  }

  // --- LoaderServiceDelegate --- //


  lsdChangeOwnerId(ownerId: string): void {
    if (ownerId) {
      this._userService.refresh();
    }
  }

  lsdLoadInterceptor(ownerId: string): boolean { return true; }

  lsdSuccessHandler(newData: number): void {
    this.errorMsg = null;
    if (this.user.deactivated) {
      this.errorMsg = 'Страница удалена или заблокирована.';
    }
  }

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    if (err instanceof AuthVkError) {

      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);

    } else if (err instanceof ApiError) {

      switch (err.code) {
        case eApiErrCode.INVALID_ID: {
          this.errorMsg = 'Несуществующий id пользователя.';
          break;
        }
        case eApiErrCode.INVALID_PARAM: {
          this.errorMsg = 'Такой страницы не существует.';
          break;
        }
        default: {
          this.errorMsg = 'Ошибка доступа.';  // ошибка vk-api
        }
      }

    }
  }

  lsdFinallyHandler(): void {
    if (!this.errorMsg && !this.hasLoadError) {
      this._postsService.changeOwnerId(this.userNumId);
      this._friendsService.changeOwnerId(this.userNumId);
    }
  }

}
