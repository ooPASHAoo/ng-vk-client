import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

import {VkApiUsersService} from '../../../../../../core/vk-api/methods/services/vk-api-users.service';
import {ApiError} from '../../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../../core/vk-api/methods/errors/token-error';
import {VkUser} from '../../../../../../core/vk-api/methods/models/vk-user.model';
import {StpError} from '../../../../../../shared/supports/safe-type-parser';

@Component({
  selector: 'pg-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() userId: string;

  user: VkUser;
  isLoaded = false;
  hasLoadError = false;

  constructor(private _router: Router,
              private _vkApiUsers: VkApiUsersService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const userIdChange = changes['userId'];
    // TODO: if !firstChange {animate}
    if (userIdChange) {
      this._refresh();
    }
  }

  // --- actions --- //

  onRefresh() {
    this._refresh();
  }

  // --- private --- //

  private _refresh() {
    this._loadUser(this.userId);
  }

  private _loadUser(userId: string) {
    this.isLoaded = false;
    this.hasLoadError = false;

    this._vkApiUsers.getById(userId)
      .subscribe(
        this._responseSuccessHandler.bind(this),
        this._responseFailureHandler.bind(this)
      );
  }

  private _responseSuccessHandler(res: VkUser) {
    this.user = res;

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
      alert('Ошибка при загрузке пользователя. Попробуйте еще раз.');
    }

    this.isLoaded = true;
  }

}
