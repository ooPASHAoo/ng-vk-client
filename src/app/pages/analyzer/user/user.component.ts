import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {VkTokenService} from '../../../core/vk-api/token/services/vk-token.service';

@Component({
  selector: 'pg-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userId: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _vkTokenService: VkTokenService) {
  }

  ngOnInit() {
    const routeUserId = this._activatedRoute.snapshot.paramMap.get('id');
    const userId = this._vkTokenService.getCurrentUserId();
    this.userId = routeUserId ? routeUserId : userId;
  }
}
