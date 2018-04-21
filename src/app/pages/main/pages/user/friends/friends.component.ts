import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {VkApiFriendsService} from '../../../../../core/vk-api/methods/services/vk-api-friends.service';
import {ApiError} from '../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../core/vk-api/methods/errors/token-error';
import {VkUser} from '../../../../../core/vk-api/methods/models/vk-user.model';
import {StpError} from '../../../../../shared/supports/safe-type-parser';
import {VkTokenService} from '../../../../../core/vk-api/token/services/vk-token.service';

@Component({
  selector: 'pg-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

    userId: string;
  // @Input() userId: string;

  friendsList: VkUser[];
  isLoaded = false;
  hasLoadError = false;

  constructor(private _activatedRoute: ActivatedRoute,
              private _vkTokenService: VkTokenService,
              private _router: Router,
              private _vkApiFriends: VkApiFriendsService) {
  }

  ngOnInit() {
    this._activatedRoute.parent.paramMap
      .subscribe((paramMap) => {
        this.userId = paramMap.get('id');
        this._refresh();
      });
  }

  // --- actions --- //

  onRefresh() {
    this._refresh();
  }

  // --- private --- //

  private _refresh() {
    this._loadFriendsList(this.userId);
  }

  private _loadFriendsList(userId: string) {
    this.isLoaded = false;
    this.hasLoadError = false;

    this._vkApiFriends.getByUserId(userId)
      .subscribe(
        this._responseSuccessHandler.bind(this),
        this._responseFailureHandler.bind(this)
      );
  }

  private _responseSuccessHandler(res: VkUser[]) {
    this.friendsList = res;

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
      // alert('Ошибка при загрузке списка друзей. Попробуйте еще раз.');
    }

    this.isLoaded = true;
  }

}
