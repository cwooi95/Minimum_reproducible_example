import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { map, switchMap, first } from 'rxjs/operators';
import { User } from './model/user-model/user.model';


/* Import Angular Firebase Packages */
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

const firebase = require('firebase');

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {
  authToken: any;

  userId: string;
  locationName: string;
  preferenceName: string;

  selectedUser: User = {
    email: '',
    password: ''
  };

  // Post request URL
  baseRegisterUrl = 'http://localhost:4000/register';
  baseLoginUrl = 'http://localhost:4000/login';
  baseCreateProfileUrl = 'http://localhost:4000/createProfile';
  baseGetUserNameUrl = 'http://localhost:4000/getUserName';
  baseGetUserProfileUrl = 'http://localhost:4000/getUserProfile';
  baseCreatePreferencesUrl = 'http://localhost:4000/createPreferences';
  baseUploadPhotoUrl = 'http://localhost:4000/upload';
  baseCreateListingUrl = 'http://localhost:4000/createListing';
  baseGerUserListingsUrl = 'http://localhost:4000/getUserListings';
  baseGetImageBase64Url = 'http://localhost:4000/imageBase64';
  baseGetLocationUrl = 'http://localhost:4000/getLocationName';
  baseGetPreferenceUrl = 'http://localhost:4000/getPreferencesName';
  baseSaveFavouriteUrl = 'http://localhost:4000/saveFavourite';

  // Get request URL
  baseGetPhotoUrl = 'http://localhost:4000/image/';

  public loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');


  /* Firebase Auth Params and Functions */
  /* --START-- */

  // User Login Param
  user$: Observable<User>;

  userData: any; // Save logged in user data
  identity: string;
  LoggedInStatus: boolean;

  constructor(
    private http?: HttpClient,
    private afAuth?: AngularFireAuth,
    private afs?: AngularFirestore,
    private router?: Router,
    public ngZone?: NgZone        // NgZone service to remove outside scope warning
  ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
          // Logged out
          return of(null);
        }
        })
      );
      this.afAuth.authState
        .pipe(
            map(user => !!user)
        )
        .subscribe(isLoggedIn => {
          this.LoggedInStatus = isLoggedIn;
          console.log('Logged in status:' + this.LoggedInStatus);
        });
  }

  getUser() {
    return this.user$.pipe(first()).toPromise();
  }

  // Google Sign In
  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.setLoggedin(true, credential.user.uid);
    console.log(credential.user);
    return this.updateUserData(credential.user);
  }

  // Facebook Sign In
  async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.setLoggedin(true, credential.user.uid);
    //console.log(credential.user, credential.user.uid);
    return this.updateUserData(credential.user);
  }

  // Sign in with email/ password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.setLoggedin(true, result.user.uid);
          this.router.navigate(['/home'], { queryParams: {userId: this.userId} });
        });
        this.updateUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.updateUserData(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['verify-email']);
    });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error);
    });
  }

  // Update User Data
  private updateUserData(user) {
    // Sets user data to firestore on login
    this.afs.firestore.doc('users/'+user.uid).get().then(docSnapshot => {
      console.log(docSnapshot.exists);
      const userRef: AngularFirestoreDocument<User> = this.afs.doc('users/'+user.uid);
      var firstLogin;
      var data;
      if (!docSnapshot.exists) {
        firstLogin = true;
        this.identity = '';
        data = {
          userId: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          timeLogin: firebase.firestore.FieldValue.serverTimestamp(),
          firstTimeLogin: firstLogin,
          identity: this.identity
        }
      }
      else{
        data = {
          timeLogin: firebase.firestore.FieldValue.serverTimestamp()
        }
      }
      var loginUserId = data.userId;
      this.router.navigate(['/home/'], { queryParams: { userId: loginUserId } });
      return userRef.set(data, { merge: true });
    });
  }

  // Sign Out using Firebase Auth
  async signOut() {
    await this.afAuth.signOut();
    this.setLoggedin(false, null);
  }

  // Set up login session local storage
  setLoggedin(value: boolean, userId: string) {
    this.loggedInStatus = value;
    this.userId = userId;
    if (value === true){
      console.log('loggedInStatus: ' + this.loggedInStatus);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userId');
      console.log('loggedInStatus: ' + this.loggedInStatus);
    }
  }
  /* --END-- */
  /* Firebase Auth Params and Functions */

  get isLoggedIn() {
    console.log('loggedInStatus: ' + this.loggedInStatus);
    console.log('userId ' + this.userId);
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString()), JSON.parse(localStorage.getItem('userId') || this.userId);
  }

  public registerUsers(user: User) {
    return this.http.post(this.baseRegisterUrl, user, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data =>
     data));
  }

  public loginUsers(user: User) {
    return this.http.post(this.baseLoginUrl, user, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data =>
     data));
  }

  public saveFavourite(userId: string, propertyID: string, like: boolean)
  {
    var saveFavouriteReq = {userId: userId, propertyid: propertyID, like: like};
    var saveFavouriteReqJSON = JSON.stringify(saveFavouriteReq);
    console.log('saveFavourite :: CP1');
    return this.http.post(this.baseSaveFavouriteUrl, saveFavouriteReqJSON, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }).pipe(map(data => data
    ));
  }

  public getLocation(locationName: string) {
    var locationObj = {location: locationName };
    var locationJSON = JSON.stringify(locationObj);
    return this.http.post(this.baseGetLocationUrl, locationJSON, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data =>
     data));
  }

  public getPreferences(preferenceName: string) {
    var preferenceObj = {preference: preferenceName };
    var preferenceJSON = JSON.stringify(preferenceObj);
    return this.http.post(this.baseGetPreferenceUrl, preferenceJSON, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).pipe(map(data =>
     data));
  }


  private extractData(res: Response) {
    let body = res.json();
    return body;
      }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
