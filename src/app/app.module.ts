import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {VkTokenModule} from './core/vk-api/token/vk-token.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VkTokenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
