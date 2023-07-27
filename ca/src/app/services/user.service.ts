/********* Angular **********/
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
/********* interface *********/
import { IUser } from '../shared/interfaces/user'
/********* fireBase *********/
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      debugger
      if (user) {

        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
    });
  }
  register(email: string, password: string, firstName: string, lastName: string, company: string | undefined) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, firstName, lastName, company);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };
  SetUserData(user: any, firstName: string, lastName: string, company: string | undefined) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      firstName: firstName,
      lastName: lastName,
      company: company,
      orders: []
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  login(email: string, password: string) {
    debugger
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        //this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

}

