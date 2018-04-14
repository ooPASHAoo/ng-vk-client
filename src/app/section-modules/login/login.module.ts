import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {OauthCallbackComponent} from './pages/oauth-callback/oauth-callback.component';
import {AuthComponent} from './pages/auth/auth.component';
import {OauthVkService} from '../../core/vk-api/oauth/vk-oauth.service';
import {VkTokenParserService} from '../../core/vk-api/token/vk-token-parser.service';
import {VkTokenStorageService} from '../../core/vk-api/token/vk-token-storage.service';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    OauthCallbackComponent,
    AuthComponent
  ],
  providers: [
    OauthVkService,
    VkTokenParserService,
    VkTokenStorageService
  ]
})
export class LoginModule {
}
