import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { DesktopHomeComponent } from './home/desktop-home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import {} from 'googlemaps';
import { SocialLoginModule} from 'angularx-social-login';

/* Firebase Header Import */
// In other files, import the environment like so:
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  entryComponents: [
    DesktopHomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
