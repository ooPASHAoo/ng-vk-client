import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from './main.component';
import {UserComponent} from './pages/user/user.component';
import {UserContentComponent} from './pages/user/user-content/user-content.component';
import {WallComponent} from './pages/user/user-content/wall/wall.component';
import {FriendsComponent} from './pages/user/user-content/friends/friends.component';
import {FellowComponent} from './pages/user/fellow/fellow.component';
import {MateComponent} from './pages/user/fellow/mate/mate.component';
import {SchoolComponent} from './pages/user/fellow/school/school.component';
import {WorkComponent} from './pages/user/fellow/work/work.component';
import {KindComponent} from './pages/user/fellow/kind/kind.component';
import {SubscribesComponent} from './pages/user/user-content/subscribes/subscribes.component';


// === page routes === //


/**
 * Components: App/Main/User/UserContent/...
 * Full path: /user/:id/...
 */
const userRootSubRoutes: Routes = [
  {path: '', component: WallComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'subscribes', component: SubscribesComponent}
];

/**
 * Components: App/Main/User/Fellow/...
 * Full path: /user/:id/fellow/...
 */
const userFellowSubRoutes: Routes = [
  {path: 'mate', component: MateComponent},
  {path: 'school', component: SchoolComponent},
  {path: 'work', component: WorkComponent},
  {path: 'kind', component: KindComponent}
];


// --- support routes --- //


/**
 * Components: App/Main/User/...
 * Full path: /user/:id/...
 */
const userContentSubRoutes: Routes = [
  {path: '', component: UserContentComponent, children: userRootSubRoutes},
  {path: 'fellow', component: FellowComponent, children: userFellowSubRoutes}
];

/**
 * Components: App/Main/...
 * Full path: /...
 */
const userSubRoutes: Routes = [
  {path: ':id', component: UserComponent, children: userContentSubRoutes}
];

/**
 * Components: App/...
 * Full path: /...
 */
const mainRoutes: Routes = [
  {path: '', component: MainComponent, children: userSubRoutes}
];


// --- module --- //


@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
