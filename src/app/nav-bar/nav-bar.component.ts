import { Component, OnInit, Output, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { MyAuthService } from '../auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [MyAuthService]
})
export class NavBarComponent implements OnInit {

  userId: string;
  userName: string;
  name: string;
  jsonName: string;
  fbLoginSuccess = false;
  googleLoginSuccess = false;

  // localStorage variable
  loggedIn: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
      public authService: MyAuthService,
      private router: Router,
      private route: ActivatedRoute,
      private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user !== null) {
        this.loggedIn = true;
        this.authService.loggedInStatus = true;
        this.userId = user.userId;
      } else {
        this.loggedIn = false;
        this.authService.loggedInStatus = false;
      }
      console.log("LoggedInStatus: " + this.authService.loggedInStatus);
   });
  }

  logOut() {
    this.authService.signOut();
    this.loggedIn = false;
    localStorage.loggedIn = false;
    this.router.navigate(['/login']);
    this.userId = null;
  }
}
