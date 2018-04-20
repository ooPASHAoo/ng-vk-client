import {NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import {VkApiUsersService} from './services/vk-api-users.service';
import {VkApiFriendsService} from './services/vk-api-friends.service';
import {VkApiWallService} from './services/vk-api-wall.service';
import {VkCurrentUserService} from './services/vk-current-user.service';
import {VkTokenModule} from '../token/vk-token.module';
import {VkApiGroupsService} from './services/vk-api-groups.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    VkTokenModule
  ],
  providers: [
    VkCurrentUserService,
    VkApiUsersService,
    VkApiFriendsService,
    VkApiWallService,
    VkApiGroupsService
  ]
})
export class VkApiModule {
}
