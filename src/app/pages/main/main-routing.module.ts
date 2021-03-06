import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from './main.component';
import {UserComponent} from './pages/user/user.component';
import {WallComponent} from './pages/user/wall/wall.component';
import {FriendsComponent} from './pages/user/friends/friends.component';


/**
 * Components: App/Main/User/UserContent/...
 * Full path: /user/:id/...
 */
const userRootSubRoutes: Routes = [
  {path: '', component: WallComponent},
  {path: 'friends', component: FriendsComponent}
];

// --- support routes --- //

/**
 * Components: App/Main/...
 * Full path: /...
 */
const userSubRoutes: Routes = [
  {path: '', redirectTo: 'im', pathMatch: 'full'},
  {path: ':id', component: UserComponent, children: userRootSubRoutes}
];

/**
 * Components: App/...
 * Full path: /...
 */
const mainRoutes: Routes = [
  {path: '', component: MainComponent, children: userSubRoutes}
];


@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
