import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalyzerRoutingModule} from './analyzer-routing.module';
import {AnalyzerComponent} from './analyzer.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {FriendsComponent} from './pages/friends/friends.component';
import {FeedComponent} from './pages/feed/feed.component';
import {UserComponent} from './pages/user/user.component';
import {VkApiModule} from '../../core/vk-api/methods/vk-api.module';
import {PostComponent} from './pages/user/components/posts-list/components/post/post.component';
import {UserInfoComponent} from './pages/user/components/user-info/user-info.component';
import {PostsListComponent} from './pages/user/components/posts-list/posts-list.component';
import {DateFormatPipe} from './shared/pipes/date-format.pipe';
import { PostAttachmentLinkComponent } from './pages/user/components/posts-list/components/post/components/post-attachment-link/post-attachment-link.component';
import { PostAttachmentPhotoComponent } from './pages/user/components/posts-list/components/post/components/post-attachment-photo/post-attachment-photo.component';

@NgModule({
  imports: [
    CommonModule,
    AnalyzerRoutingModule,
    VkApiModule
  ],
  declarations: [
    AnalyzerComponent,
    HeaderComponent,
    SidebarComponent,
    FriendsComponent,
    FeedComponent,
    UserComponent,
    PostComponent,
    UserInfoComponent,
    PostsListComponent,
    DateFormatPipe,
    PostAttachmentLinkComponent,
    PostAttachmentPhotoComponent
  ],
})
export class AnalyzerModule {
}
