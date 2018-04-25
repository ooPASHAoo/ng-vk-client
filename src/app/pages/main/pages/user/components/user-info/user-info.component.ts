import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {VkUser} from '../../../../../../core/vk-api/methods/models/vk-user.model';
import {fadeInOutAnimation} from '../../../../../../shared/animations/fade-in-out.animation';


@Component({
  selector: 'pg-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [fadeInOutAnimation]
})
export class UserInfoComponent implements OnInit, OnChanges {

  @Input() user: VkUser;
  @Input() errorMsg: string;

  isLoadedAvatar = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.isLoadedAvatar = false;
    }
  }

  avatarHasLoaded() {
    this.isLoadedAvatar = true;
  }
}
