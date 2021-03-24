import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyAuthService } from '../auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import 'rxjs/add/operator/filter';
import { Meta, Title } from '@angular/platform-browser';

// Declare pane type for three divisions in homepage
// type PaneType = 'top' | 'middle' | 'bottom';

@Component({
  selector: 'app-home',
  templateUrl: './desktop-home.component.html',
  styleUrls: ['./desktop-home.component.css'],
  providers: [MyAuthService],
  // animations: [
  //   trigger('slideInOut', [
  //     state('top', style({
  //       transform: 'translateY(0)',
  //       height: '100%'
  //     })),
  //     state('middle', style({
  //       transform: 'translateY(-100%)',
  //       height: '100%'
  //     })),
  //     transition('top => middle', animate('500ms ease-out')),
  //     transition('middle => top', animate('500ms ease-in')),
  //   ])
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopHomeComponent implements OnInit {
  // Slide in and out animation
  // @Input() activePane: PaneType = 'top';

  userId: string;
  name: string;

//   paneType = 'top';

//   @HostListener('window:scroll', ["$event"]) onScroll($event) {
//     console.log(document.documentElement.scrollTop);
//     //In chrome and some browser scroll is given to body tag
//     let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
//     let max = document.documentElement.scrollHeight;
//     console.log('pos: ' + pos);
//     console.log('max: ' + max);
//     // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
//     if (document.documentElement.scrollTop < 18)  {
//       //Do your action here
//       console.log('Reach window top: ');
//       this.paneType = 'top';
//     }
//     // if(document.documentElement.scrollTop > 1000)   {
//     //   //Do your action here
//     //   console.log('Reach window bottom: ');
//     //   this.paneType = 'bottom';
//     //   }
//     if (document.documentElement.scrollTop > 18)  {
//       //Do your action here
//       console.log('Reach window middle: ');
//       this.paneType = 'middle';
//     }
//  }

  constructor(
    private route: ActivatedRoute,
    public authService: MyAuthService,
    private router: Router,
    private title: Title,
    private meta: Meta) {
    }

  ngOnInit() {
    this.route.queryParams
      .filter(params => params.userId)
      .subscribe(params => {
        this.userId = params.userId;
        console.log('Login Success, User ID = ' + this.userId);
        });
    this.title.setTitle('Finding rooms/ roommates in Singapore');
    this.meta.addTags([
      {name: 'description', content: 'Roomer is a platform for people to look for rental rooms or co-living buddies in Singapore'},
      {name: 'image', content: '../../assets/image/roomer-logo.png'}
    ], true);
  }


  redirectLoginPage() {
  }

  gotoSeachRoom() {
    if (this.authService.loggedInStatus === false) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/search-listings/'], { queryParams: {userId: this.userId} });
    }
  }

  gotoSeachBuddy() {
    if (this.authService.loggedInStatus === false) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/search-buddy/'], { queryParams: {userId: this.userId} });
    }
  }

  gotoPostListings() {
    if (this.authService.loggedInStatus === false) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/post-listings/'], { queryParams: {userId: this.userId} });
    }
  }

  // slide() {
  //   this.paneType = (this.paneType === 'middle') ? 'top' : 'middle';
  // }

  // Function to get y postion
  // getYPosition (e: Event): number {
  //   console.log('Print Y postion event: ' + (e.target as Element).scrollTop);
  //   return (e.target as Element).scrollTop;
  // }

}

