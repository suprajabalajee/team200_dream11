import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SimulateMatchComponent} from './simulate-match/simulate-match.component'
import { MainPageComponent } from './main-page/main-page.component'
import { SimulateMatchNormalComponent } from './simulate-match-normal/simulate-match-normal.component'

const routes: Routes = [{
    path: 'simulateMatch', component: SimulateMatchComponent
},
  {
    path: 'simulateMatchNormal', component: SimulateMatchNormalComponent
    },
  {
    path: '**', component: MainPageComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
