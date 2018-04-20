import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {VkTokenModule} from './core/vk-api/token/vk-token.module';
import {AuthGuard} from './shared/guards/auth-guard.service';
import {VkApiModule} from './core/vk-api/methods/vk-api.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VkApiModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
