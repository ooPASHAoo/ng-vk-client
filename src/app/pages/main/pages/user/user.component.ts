import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VkTokenService} from '../../../../core/vk-api/token/services/vk-token.service';

@Component({
  selector: 'pg-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
