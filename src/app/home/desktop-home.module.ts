import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopHomeRoutingModule } from './desktop-home-routing.module';
import { DesktopHomeComponent } from './desktop-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DesktopHomeRoutingModule,
    SharedModule
  ]
})
export class DesktopHomeModule { }
