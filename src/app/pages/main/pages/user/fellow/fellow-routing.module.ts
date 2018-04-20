import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FellowComponent} from './fellow.component';
import {MateComponent} from './mate/mate.component';
import {SchoolComponent} from './school/school.component';
import {WorkComponent} from './work/work.component';
import {KindComponent} from './kind/kind.component';

// import {UserComponent} from './user.component';
// import {WallComponent} from './pages/wall/wall.component';
// import {FriendsComponent} from './pages/friends/friends.component';
// import {SubscribesComponent} from './pages/subscribes/subscribes.component';

const fellowRoutes: Routes = [{
  path: '', component: FellowComponent, children: [
    {path: 'mate', component: MateComponent},
    {path: 'school', component: SchoolComponent},
    {path: 'work', component: WorkComponent},
    {path: 'kind', component: KindComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(fellowRoutes)],
  exports: [RouterModule]
})
export class FellowRoutingModule {
}

