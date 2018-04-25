import {Component, Input, OnInit} from '@angular/core';

import {VkUser} from '../../../../../../core/vk-api/methods/models/vk-user.model';
import {fadeInOutAnimation} from '../../../../../../shared/animations/fade-in-out.animation';


@Component({
  selector: 'pg-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [fadeInOutAnimation]
})
export class UserInfoComponent implements OnInit {

  @Input() user: VkUser;
  @Input() errorMsg: string;

  constructor() {}

  ngOnInit() {}

}
