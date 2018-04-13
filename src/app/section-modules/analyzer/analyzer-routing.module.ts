import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AnalyzerComponent} from './analyzer.component';

const analyzerRoutes: Routes = [
  {path: '', component: AnalyzerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(analyzerRoutes)],
  exports: [RouterModule]
})
export class AnalyzerRoutingModule {
}
