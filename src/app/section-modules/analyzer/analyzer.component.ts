import {Component, OnInit} from '@angular/core';
import {VkTokenModel} from '../../core/vk-api/token/models/vk-token.model';
import {VkTokenService} from '../../core/vk-api/token/services/vk-token.service';

@Component({
  selector: 'pg-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {

  token: VkTokenModel;

  constructor(private _tokenService: VkTokenService) {
  }

  ngOnInit() {
    this.token = this._tokenService.getActualLocalToken();
  }

}
