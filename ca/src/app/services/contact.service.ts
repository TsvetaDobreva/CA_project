import { Injectable } from '@angular/core';
import { IContactMsg } from '../shared/interfaces/contactMsg';
import { Router } from '@angular/router'

/********* firebase *********/
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from 'src/main';
import { IOfferRequest, IShowNewOfferRequest } from '../shared/interfaces/offerRequest';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private userService: UserService
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

    this.addToDb(contactMsgData, 'contactMsg');
  }

  createNewRequest(count: number, measure: string, systemType: string, glassType: string) {
    const newRequestData: IOfferRequest = {
      count,
      measure,
      systemType,
      glassType,
      status: 'new',
      date: new Date(),
      user: this.userService.user
    };

    this.addToDb(newRequestData, 'offerRequest');
  }

  async getNewRequest() {
    const newRequest: any = [];
    try {
      let counter = 1;
      const q = query(collection(db, 'offerRequest'), where('status', '==', 'new'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const record: IShowNewOfferRequest = {
          uid: doc.id,
          position: counter,
          email: doc.data()['user']['email'],
          date:  doc.data()['date'].toDate().toLocaleString(),
          count: doc.data()['count'],
          measure: doc.data()['measure'],
          systemType: doc.data()['systemType'],
          glassType: doc.data()['glassType'],
          status: doc.data()['status']
        }
        counter++;
        newRequest.push(record);
      });
      
    }catch(error) {
      alert(error);
    }
    return newRequest;
  }

  addToDb(data: object, path: string) {
    addDoc(collection(db, path), data)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => { alert(error) })
  }
}

