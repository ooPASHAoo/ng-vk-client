import {NgModule} from '@angular/core';

import {VkTokenParserService} from './services/vk-token-parser.service';
import {VkTokenStorageService} from './services/vk-token-storage.service';
import {VkTokenService} from './services/vk-token.service';


@NgModule({
  providers: [
    VkTokenParserService,
    VkTokenStorageService,
    VkTokenService
  ]
})
export class VkTokenModule {
}
