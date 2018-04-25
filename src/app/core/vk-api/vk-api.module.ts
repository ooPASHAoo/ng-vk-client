import {NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

import {VkApiUsersService} from './methods/services/vk-api-users.service';
import {VkApiFriendsService} from './methods/services/vk-api-friends.service';
import {VkApiWallService} from './methods/services/vk-api-wall.service';
import {VkCurrentUserService} from './methods/services/vk-current-user.service';
import {VkTokenModule} from './token/vk-token.module';
import {VkApiGroupsService} from './methods/services/vk-api-groups.service';


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
