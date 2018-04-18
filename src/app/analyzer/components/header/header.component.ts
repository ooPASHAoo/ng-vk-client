import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {VkTokenService} from '../../../core/vk-api/token/services/vk-token.service';

@Component({
  selector: 'pg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private _router: Router,
              private _serviceToken: VkTokenService) {
  }

  onLogout() {
    // TODO: Красивое окошко
    if (confirm('Выйти из учетной записи?')) {
      // TODO:?: Мб нужно в 'Главном' компоненте?
      this._serviceToken.removeLocalToken();
      this._router.navigate(['/login']);
    }
  }
}
