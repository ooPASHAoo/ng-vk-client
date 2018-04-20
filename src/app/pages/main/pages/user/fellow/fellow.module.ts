import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FellowComponent} from './fellow.component';
import {KindComponent} from './kind/kind.component';
import {MateComponent} from './mate/mate.component';
import {SchoolComponent} from './school/school.component';
import {WorkComponent} from './work/work.component';
import {FellowRoutingModule} from './fellow-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FellowRoutingModule
  ],
  declarations: [
    FellowComponent,
    KindComponent,
    MateComponent,
    SchoolComponent,
    WorkComponent
  ]
})
export class FellowModule {
}
