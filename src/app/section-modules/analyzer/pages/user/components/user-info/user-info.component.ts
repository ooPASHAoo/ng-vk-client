import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {VkApiUsersService} from '../../../../../../core/vk-api/methods/services/vk-api-users.service';
import {User} from '../../../../../../core/vk-api/methods/models/user.model';
import {ApiError} from '../../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../../core/vk-api/methods/errors/token-error';

@Component({
  selector: 'pg-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() userId: string;

  user: User;
  isLoaded = false;
  hasLoadError = false;

  constructor(private _router: Router,
              private _vkApiUsers: VkApiUsersService) {
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

  private _responseSuccessHandler(res: User) {
    this.user = res;

    this.isLoaded = true;
  }

  private _responseFailureHandler(err: ApiError|AuthVkError|Error) {
    console.warn(`- PG: ${err.name} - ${err.message}`);
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
