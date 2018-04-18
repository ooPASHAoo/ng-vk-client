import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login.component';
import {OauthCallbackComponent} from './pages/oauth-callback/oauth-callback.component';
import {AuthComponent} from './pages/auth/auth.component';

const loginRoutes: Routes = [{
  path: '', component: LoginComponent, children: [
    {path: '', component: AuthComponent},
    {path: 'oauth-callback', component: OauthCallbackComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
