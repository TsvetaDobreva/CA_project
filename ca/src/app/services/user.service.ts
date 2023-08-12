/********* Angular **********/
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

/********* interface *********/
import { IUser } from '../shared/interfaces/user';

/********* firebase *********/
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { getAuth } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  userData: any;
  userInfo: any;
  auth = getAuth();
  isAdminTest = false;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${this.userData.uid}`);
        userRef.snapshotChanges().subscribe(data => {

          this.userInfo = data.payload.data();
          this.isAdminTest = data.payload.data()['isAdmin'] ? true : false
          return this.userInfo;
        });
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  };

  isAdmin() {
    const userUid:any = JSON.parse(localStorage.getItem('user')!)?.uid;
    if(!userUid) {
      this.router.navigate(['auth/login']);
    }
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${userUid}`);
    return userRef.snapshotChanges();

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  };

  get isAdminRole(): boolean {
    return this.userInfo?.isAdmin;
  }

  get user(): IUser {
    return this.userInfo;
  };

  getUserUid() {
    return JSON.parse(localStorage.getItem('user')!).uid;
  };

  register(email: string, password: string, firstName: string, lastName: string, company: string | undefined) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user, firstName, lastName, company);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        return error;
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
  };

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/']);
          }
        });
      })

  };

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
    });
  };
}

