import {Component, Input, OnInit} from '@angular/core';

import {VkUser} from '../../../../../core/vk-api/methods/models/vk-user.model';
import {fadeInOutAnimation} from '../../../../../shared/animations/fade-in-out.animation';


@Component({
  selector: 'pg-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  animations: [fadeInOutAnimation]
})
export class UserCardComponent implements OnInit {

  @Input() user: VkUser|null;

  constructor() {}

  ngOnInit() {}

}
