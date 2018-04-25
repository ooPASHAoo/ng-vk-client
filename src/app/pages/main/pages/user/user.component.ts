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

  get user(): VkUser {
    return this._userService.user;
  }

  errorMsg = '';

  isLoading = false;
  hasLoadError = false;

  constructor(private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _currentUser: VkCurrentUserService,
              private _userService: UserService,
              private _postsService: PostsListService,
              private _friendsService: FriendsListService) {
  }

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

    this._postsService.cancelLoading();
    this._postsService.resetData();
    this._friendsService.cancelLoading();
    this._friendsService.resetData();

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
    console.log('- PG:', 'lsdSuccessHandler');
    this.hasLoadError = false;

    console.log('- PG:', '--1--');
    if (this.user.deactivated) {
      console.log('- PG:', '--2--');
      this.errorMsg = 'Страница удалена или заблокирована.';
    }

  }

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    console.log('- PG:', 'lsdFailureHandler');
    this.hasLoadError = true;
    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else {
      alert('Ошибка при загрузке пользователя. Попробуйте еще раз.');
    }

    if (err instanceof ApiError) {
      switch (err.code) {
        case eApiErrCode.INVALID_ID: {
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
      }
    }

  }

  lsdFinallyHandler(): void {
    this.isLoading = false;
    console.log('- PG:', '>>>');
    if (!this.errorMsg && !this.hasLoadError) {
      console.log('- PG:', '>>> YES');
      this._postsService.resetWithNewOwnerId(this.userNumId);
      this._friendsService.resetWithNewOwnerId(this.userNumId);
    }
  }

}
