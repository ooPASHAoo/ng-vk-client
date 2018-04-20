import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VkTokenService} from '../../../../../core/vk-api/token/services/vk-token.service';

@Component({
  selector: 'pg-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {

  userId: string;

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this._activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.userId = paramMap.get('id');
      });
  }

}
