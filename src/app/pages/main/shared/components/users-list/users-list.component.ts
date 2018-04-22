import {Component, Input, OnInit} from '@angular/core';

import {VkUser} from '../../../../../core/vk-api/methods/models/vk-user.model';

@Component({
  selector: 'pg-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() usersList: VkUser[];

  constructor() {
  }

  ngOnInit() {
  }

}
