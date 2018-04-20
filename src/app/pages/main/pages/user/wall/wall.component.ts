import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VkTokenService} from '../../../../../core/vk-api/token/services/vk-token.service';

@Component({
  selector: 'pg-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss'],
})
export class WallComponent implements OnInit {


  ownerId: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _vkTokenService: VkTokenService) {
  }

  ngOnInit() {
    this._activatedRoute.paramMap
      .subscribe((paramMap) => {
        this.ownerId = paramMap.get('id');
      });
  }

}
