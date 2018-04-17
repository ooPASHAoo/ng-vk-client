import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AnalyzerComponent} from './analyzer.component';
import {FriendsComponent} from './pages/friends/friends.component';
import {FeedComponent} from './pages/feed/feed.component';
import {UserComponent} from './pages/user/user.component';

const analyzerRoutes: Routes = [{
  path: '', component: AnalyzerComponent, children: [
    {path: '', component: UserComponent},
    {path: 'friends', component: FriendsComponent},
    {path: 'feed', component: FeedComponent},
    {path: ':id', component: UserComponent}]
}];

@NgModule({
  imports: [RouterModule.forChild(analyzerRoutes)],
  exports: [RouterModule]
})
export class AnalyzerRoutingModule {
}
