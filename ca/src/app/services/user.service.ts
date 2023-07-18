import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { collection, addDoc, doc, getDoc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment.development';
import { db } from 'src/main';
import { NgForm } from '@angular/forms';
import { from, Observable } from 'rxjs';

const apiURL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})

export class UserService {
  firebaseAuth = getAuth();
  uid: string | any;
  user: User | undefined;

  constructor(
    // private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore
  ) { }


  register(email: string, password: string, firstName: string, lastName: string, company: string | undefined) {
    createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.uid = userCredential.user.uid;
        return this.firestore.collection('user')
          .doc(userCredential.user.uid)
          .set({ email: email, firstName: firstName, lastName: lastName, company: company });
      })
      .then(() => {
        // Registered, signed in and added to DB collection 'users'
        this.router.navigate(['users/profile'], {
          queryParams: {
            id: this.uid
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
      );
  };

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then((userCredential) => { // Signed in 
        this.user = userCredential.user;
        this.uid = this.user.uid;
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

}

