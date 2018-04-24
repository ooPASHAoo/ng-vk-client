import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';

import {VkApiUsersService} from '../../../../../../core/vk-api/methods/services/vk-api-users.service';
import {ApiError} from '../../../../../../core/vk-api/methods/errors/api-error';
import {AuthVkError} from '../../../../../../core/vk-api/methods/errors/token-error';
import {VkUser} from '../../../../../../core/vk-api/methods/models/vk-user.model';
import {StpError} from '../../../../../../shared/supports/safe-type-parser';
import {fadeInOutAnimation} from '../../../../../../shared/animations/fade-in-out.animation';

@Component({
  selector: 'pg-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [fadeInOutAnimation]
})
export class UserInfoComponent implements OnInit {

  @Input() user: VkUser;

  constructor() {
  }

  ngOnInit() {
    // console.log('- PG:', this.user);
  }

}
