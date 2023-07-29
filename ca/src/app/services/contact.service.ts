import { Injectable } from '@angular/core';
import { IContactMsg } from '../shared/interfaces/contactMsg';
import { Router } from '@angular/router'

/********* firebase *********/
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from 'src/main';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  constructor(
    public afs: AngularFirestore,
    private router: Router
  ) { }

  createNewContactMsg(email: string, phone: string, firstName: string, lastName: string, text: string) {
    const contactMsgData: IContactMsg = {
      email,
      phone,
      firstName,
      lastName,
      text,
      createDate: new Date(),
      read: false
    };

    addDoc(collection(db, 'contactMsg'), contactMsgData)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => { alert(error) });
  }
}
