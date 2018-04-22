import {Component, Input, OnInit} from '@angular/core';

import {VkUser} from '../../../../../core/vk-api/methods/models/vk-user.model';

@Component({
  selector: 'pg-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  @Input() user: VkUser|null;

  constructor() { }

  ngOnInit() {
  }

}
