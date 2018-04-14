import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AnalyzerRoutingModule} from './analyzer-routing.module';
import {AnalyzerComponent} from './analyzer.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { TestPage1Component } from './pages/test-page1/test-page1.component';
import { TestPage11Component } from './pages/test-page1-1/test-page1-1.component';
import { TestPage2Component } from './pages/test-page2/test-page2.component';

@NgModule({
  imports: [
    CommonModule,
    AnalyzerRoutingModule
  ],
  declarations: [
    AnalyzerComponent,
    HeaderComponent,
    SidebarComponent,
    TestPage1Component,
    TestPage11Component,
    TestPage2Component
  ],
})
export class AnalyzerModule {
}
