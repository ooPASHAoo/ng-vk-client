import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AppComponent} from './app.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'login', loadChildren: './section-modules/login/login.module#LoginModule'},
  {path: 'analyzer', loadChildren: './section-modules/analyzer/analyzer.module#AnalyzerModule'},
  {path: 'about', loadChildren: './section-modules/about/about.module#AboutModule'},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
