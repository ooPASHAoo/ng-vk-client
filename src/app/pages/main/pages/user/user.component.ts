import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PostsListService} from '../../../../core/services/posts-list.service';
import {UserService} from '../../../../core/services/user.service';
import {LoaderServiceDelegate} from '../../../../core/services/abstracts/loader.service.abstract';
import {VkUser} from '../../../../core/vk-api/methods/models/vk-user.model';
import {ApiError, eApiErrCode} from '../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../core/vk-api/methods/errors/token-error';
import {FriendsListService} from '../../../../core/services/friends-list.service';
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

  errorMsg = '';

  isLoading = false;  // TODO: get isLoading()
  hasLoadError = false;


  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _currentUser: VkCurrentUserService,
              private _userService: UserService,
              private _postsService: PostsListService,
              private _friendsService: FriendsListService) {}

  ngOnInit() {
    this._activatedRoute.paramMap
      .subscribe((paramMap) => {
        const userIdParam = paramMap.get('id');
        if (userIdParam === this._currentUser.getId()) {
          const childPath = this._activatedRoute.snapshot.children
            .reduce((sum, v) => {
              return sum + v.url.join('');
            }, '');
          this._router.navigate(['/im', childPath]);
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

    this._userService.loaderDelegate = this;
    this._userService.resetWithNewOwnerId(this.userNumId);
  }


  // --- LoaderServiceDelegate --- //


  lsdChangeOwnerId(ownerId: string): void {
    this._userService.load();
  }

  lsdLoadInterceptor(ownerId: string): boolean {
    this.isLoading = true;
    return true;
  }

  lsdSuccessHandler(newData: number): void {
    this.hasLoadError = false;
    this.errorMsg = null;

    if (this.user.deactivated) {
      console.log('|UserComponent view log|: Страница удалена или заблокирована.');
      this.errorMsg = 'Страница удалена или заблокирована.';
    }
  }

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    this.hasLoadError = true;
    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else if (err instanceof ApiError) {
      switch (err.code) {
        case eApiErrCode.INVALID_ID: {
          console.log('|UserComponent view log|: Несуществующий id пользователя.');
          this.errorMsg = 'Несуществующий id пользователя.';
          break;
        }
        // case eApiErrCode.ACCESS_DENIED: {
        //   this.errorMsg = 'Доступ запрещен.';
        //   break;
        // }
        // case eApiErrCode.DELETE_OR_BAN: {
        //   this.errorMsg = 'Страница удалена или заблокирована.';
        //   break;
        // }
        case eApiErrCode.INVALID_PARAM: {
          console.log('|UserComponent view log|: Такой страницы не существует.');
          this.errorMsg = 'Такой страницы не существует.';
          break;
        }
      }
    } else {
      console.warn('Ошибка при загрузке пользователя. Попробуйте еще раз.');
    }
  }

  lsdFinallyHandler(): void {
    this.isLoading = false;

    if (!this.errorMsg && !this.hasLoadError) {
      this._postsService.resetWithNewOwnerId(this.userNumId);
      this._friendsService.resetWithNewOwnerId(this.userNumId);
    }
  }

}
