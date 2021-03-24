import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesktopHomeComponent } from './desktop-home.component';

const routes: Routes = [
  {
    path:'',
    component: DesktopHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesktopHomeRoutingModule { }
