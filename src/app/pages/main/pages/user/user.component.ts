import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsListService} from '../../../../core/services/posts-list.service';
import {UserService} from '../../../../core/services/user.service';
import {LoaderServiceDelegate} from '../../../../core/services/abstracts/loader.service.abstract';
import {VkUser} from '../../../../core/vk-api/methods/models/vk-user.model';
import {ApiError} from '../../../../core/vk-api/methods/errors/api-error';
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

  get user(): VkUser {
    return this._userService.user;
  }

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
        this.changeUserId(paramMap.get('id'));
      });
  }

  changeUserId(userId: string) {
    if (this._currentUser.getId() === userId) {
      this._router.navigate(['/im']);
      return;
    }
    this.userId = userId;

    const userNumId = (userId === 'im') ? this._currentUser.getId() : userId;
    this._userService.loaderDelegate = this;
    this._userService.resetWithNewOwnerId(userNumId);
    this._postsService.resetWithNewOwnerId(userNumId);
    this._friendsService.resetWithNewOwnerId(userNumId);
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
  }

  lsdFailureHandler(err: ApiError|AuthVkError|Error): void {
    this.hasLoadError = true;
    if (err instanceof AuthVkError) {
      alert(err.userDescription);
      this._router.navigate([err.loginRoute]);
    } else {
      alert('Ошибка при загрузке пользователя. Попробуйте еще раз.');
    }
  }

  lsdFinallyHandler(): void {
    this.isLoading = false;
  }

}
