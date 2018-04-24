import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainComponent} from './main.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MainRoutingModule} from './main-routing.module';
import {UserComponent} from './pages/user/user.component';
import {WallComponent} from './pages/user/wall/wall.component';
import {UserInfoComponent} from './pages/user/components/user-info/user-info.component';
import {PostsListComponent} from './shared/components/posts-list/posts-list.component';
import {PostComponent} from './shared/components/post/post.component';
import {DateFormatPipe} from './shared/pipes/date-format.pipe';
import {PostAttachmentLinkComponent} from './shared/components/post/post-attachment-link/post-attachment-link.component';
import {PostAttachmentPhotoComponent} from './shared/components/post/post-attachment-photo/post-attachment-photo.component';
import {FriendsComponent} from './pages/user/friends/friends.component';
import {UserContentMenuComponent} from './pages/user/components/user-content-menu/user-content-menu.component';
import {SpinnerComponent} from '../../shared/components/spinner/spinner.component';
import {UsersListComponent} from './shared/components/users-list/users-list.component';
import {UserCardComponent} from './shared/components/user-card/user-card.component';
import {ErrorRetryComponent} from '../../shared/components/error-retry/error-retry.component';
import {LoaderRectComponent} from '../../shared/components/loader-rect/loader-rect.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,

    UserComponent,
    WallComponent,
    FriendsComponent,

    UserInfoComponent,
    PostsListComponent,
    PostComponent,

    UsersListComponent,
    UserCardComponent,

    DateFormatPipe,
    PostAttachmentLinkComponent,
    PostAttachmentPhotoComponent,
    UserContentMenuComponent,

    SpinnerComponent,
    ErrorRetryComponent,
    LoaderRectComponent
  ],
})
export class MainModule {
}
