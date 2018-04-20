import {NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import {VkApiUsersService} from './services/vk-api-users.service';
import {VkApiFriendsService} from './services/vk-api-friends.service';
import {VkApiWallService} from './services/vk-api-wall.service';
import {VkCurrentUserService} from './services/vk-current-user.service';
import {VkTokenModule} from '../token/vk-token.module';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    VkTokenModule
  ],
  providers: [
    VkApiUsersService,
    VkApiFriendsService,
    VkApiWallService,
    VkCurrentUserService
  ]
})
export class VkApiModule {
}
