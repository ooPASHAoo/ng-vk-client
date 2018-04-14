import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalyzerRoutingModule} from './analyzer-routing.module';
import {AnalyzerComponent} from './analyzer.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    AnalyzerRoutingModule
  ],
  declarations: [
    AnalyzerComponent,
    HeaderComponent,
    SidebarComponent
  ],
})
export class AnalyzerModule {
}
