import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {VkCurrentUserService} from '../../../../core/vk-api/methods/services/vk-current-user.service';


@Component({
  selector: 'pg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private _router: Router,
              private _currentUser: VkCurrentUserService) {}

  onLogout() {
    // TODO: Красивое окошко
    if (confirm('Выйти из учетной записи?')) {
      // TODO:?: Мб нужно в 'Главном' компоненте?
      this._currentUser.logout();
      this._router.navigate(['/login']);
    }
  }

}
