import { NgModule } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from '@angular/router';

// All the Angular components
import { DesktopHomeComponent } from './home/desktop-home.component';

const routes: Routes = [];

const desktop_routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/desktop-home.module').then(m => m.DesktopHomeModule)
  },
  {
    path: 'home/:id',
    loadChildren: () => import('./home/desktop-home.module').then(m => m.DesktopHomeModule)
},
  // directs all other routes to the main page
  {path: '**', redirectTo: 'home'}
];

const mobile_routes: Routes = [
  {path: 'home', component: DesktopHomeComponent},
  {path: 'home/:id', component: DesktopHomeComponent},
  // directs all other routes to the main page
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  // as default we set the desktop routing configuration. if mobile will be started it will be replaced below.
  // note that we must specify some routes here (not an empty array) otherwise the trick below doesn't work...
  imports: [RouterModule.forRoot(desktop_routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public constructor(
    private router: Router) {
}
}
