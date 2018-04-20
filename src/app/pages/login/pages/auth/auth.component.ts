import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {OAUTH_EVENT} from '../../../../core/vk-api/oauth/vk-oauth.const';
import {OauthVkService} from '../../../../core/vk-api/oauth/vk-oauth.service';
import {VkTokenParserService} from '../../../../core/vk-api/token/services/vk-token-parser.service';
import {VkTokenModel} from '../../../../core/vk-api/token/models/vk-token.model';
import {VkTokenStorageService} from '../../../../core/vk-api/token/services/vk-token-storage.service';

@Component({
  selector: 'pg-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private _oauthListener = function (event: CustomEvent) {
    this._oauthHandler(event['detail']);
  }.bind(this);


  // === Methods === //


  constructor(private _router: Router,
              private _oauthVk: OauthVkService,
              private _tokenParser: VkTokenParserService,
              private _tokenStorage: VkTokenStorageService) {
  }

  ngOnInit() {
    window.addEventListener(OAUTH_EVENT, this._oauthListener);
  }

  ngOnDestroy() {
    window.removeEventListener(OAUTH_EVENT, this._oauthListener);
  }

  // --- actions --- //

  onLogin() {
    this._oauthVk.showPopupAuth();
  }

  // --- private --- //

  private _oauthHandler(resultHash: string) {
    this._tokenParser.parseHash(resultHash)
      .then((token: VkTokenModel) => {
        this._tokenStorage.saveToken(token);
        this._router.navigate(['/main']);
      })
      .catch((err) => {
        this._showError(err, 'Произошла ошибка, попробуйте еще.');
      });
  }

  private _showError(error: Error, alertText: string) {
    // TODO: Beautiful error show & different errors
    console.log('Auth error:', error);
    alert(alertText);
  }

}
