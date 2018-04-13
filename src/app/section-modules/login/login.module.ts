import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {OauthCallbackComponent} from './pages/oauth-callback/oauth-callback.component';
import {AuthComponent} from './pages/auth/auth.component';
import {OauthVkService} from './services/vk-oauth.service';
import {VkTokenParserService} from './services/vk-token-parser.service';
import {VkTokenStorageService} from '../../shared/services/vk-token-storage.service';

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
