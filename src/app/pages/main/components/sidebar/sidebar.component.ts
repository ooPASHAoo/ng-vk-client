import {Component, Input, OnInit} from '@angular/core';
import {VkCurrentUserService} from '../../../../core/vk-api/methods/services/vk-current-user.service';

@Component({
  selector: 'pg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userId: string;

  constructor(private _currentUser: VkCurrentUserService) {
  }

  ngOnInit() {
    this.userId = this._currentUser.getId();
    if (!this.userId) {
      console.warn('PG|SidebarComponent: current user id is empty.');
    }
  }

}
