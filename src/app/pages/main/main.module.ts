import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainComponent} from './main.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MainRoutingModule} from './main-routing.module';
import {UserComponent} from './pages/user/user.component';
import {UserContentComponent} from './pages/user/user-content/user-content.component';
import {WallComponent} from './pages/user/user-content/wall/wall.component';
import {UserInfoComponent} from './shared/components/user-info/user-info.component';
import {PostsListComponent} from './shared/components/posts-list/posts-list.component';
import {PostComponent} from './shared/components/post/post.component';
import {DateFormatPipe} from './shared/pipes/date-format.pipe';
import {PostAttachmentLinkComponent} from './shared/components/post/post-attachment-link/post-attachment-link.component';
import {PostAttachmentPhotoComponent} from './shared/components/post/post-attachment-photo/post-attachment-photo.component';
import {FriendsComponent} from './pages/user/user-content/friends/friends.component';
import {FellowComponent} from './pages/user/fellow/fellow.component';
import {MateComponent} from './pages/user/fellow/mate/mate.component';
import {SchoolComponent} from './pages/user/fellow/school/school.component';
import {WorkComponent} from './pages/user/fellow/work/work.component';
import {KindComponent} from './pages/user/fellow/kind/kind.component';
import {GroupsComponent} from './pages/user/user-content/groups/groups.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    SidebarComponent,

    UserComponent,
    UserContentComponent,
    WallComponent,
    FriendsComponent,
    FellowComponent,
    MateComponent,
    SchoolComponent,
    WorkComponent,
    KindComponent,

    UserInfoComponent,
    PostsListComponent,
    PostComponent,

    DateFormatPipe,
    PostAttachmentLinkComponent,
    PostAttachmentPhotoComponent,
    GroupsComponent
  ],
})
export class MainModule {
}
