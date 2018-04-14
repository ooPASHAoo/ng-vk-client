import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AnalyzerComponent} from './analyzer.component';
import {TestPage1Component} from './pages/test-page1/test-page1.component';
import {TestPage2Component} from './pages/test-page2/test-page2.component';
import {TestPage11Component} from './pages/test-page1-1/test-page1-1.component';

const analyzerRoutes: Routes = [
  {
    path: '', component: AnalyzerComponent, children: [
    {
      path: 'test-1', component: TestPage1Component, children: [
      {path: 'test-1', component: TestPage11Component}
    ]
    },
    {path: 'test-2', component: TestPage2Component},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(analyzerRoutes)],
  exports: [RouterModule]
})
export class AnalyzerRoutingModule {
}
