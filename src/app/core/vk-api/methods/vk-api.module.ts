import {NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import {VkApiUsersService} from './services/vk-api-users.service';
import {VkApiFriendsService} from './services/vk-api-friends.service';
import {VkApiWallService} from './services/vk-api-wall.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    VkApiUsersService,
    VkApiFriendsService,
    VkApiWallService,
  ]
})
export class VkApiModule {
}
