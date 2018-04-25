import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {OAUTH_EVENT} from '../../../../core/vk-api/oauth/vk-oauth.const';


@Component({
  template: ''
})
export class OauthCallbackComponent implements OnInit {

  constructor(private _router: Router) {
  }

  ngOnInit() {
    if (!window.opener) {
      this._router.navigate(['/']);
      return;
    }

    const resultHash = window.location.hash.replace('#', '');
    const oauthResultEvent = new CustomEvent(OAUTH_EVENT, {'detail': resultHash});

    window.opener.dispatchEvent(oauthResultEvent);
    window.close();
  }
}
