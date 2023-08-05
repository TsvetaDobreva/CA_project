import { Injectable } from '@angular/core';
import { IContactMsg } from '../shared/interfaces/contactMsg';
import { Router } from '@angular/router';
import { DB_PATH } from '../shared/constant/dbPath';

/********* firebase *********/
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { addDoc, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from 'src/main';
import { IDialogShowOfferRequest, IOfferRequest, IShowNewOfferRequest } from '../shared/interfaces/offerRequest';
import { UserService } from './user.service';
import { ICompleteOffer, IOffer, IRowInMyOfferTable, IShowConfirmOfferInTable, IShowOffer } from '../shared/interfaces/offer';
import { map } from 'rxjs';


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

    this.addToDb(contactMsgData, DB_PATH.CONTACT_MESSAGES, true);
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

    this.addToDb(newRequestData, DB_PATH.OFFER_REQUEST, true);
  }

  async getNewRequest() {
    const newRequest: any = [];
    try {
      let counter = 1;
      const q = query(collection(db, DB_PATH.OFFER_REQUEST), where('status', '==', 'new'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const record: IShowNewOfferRequest = {
          uid: doc.id,
          position: counter,
          email: doc.data()['user']['email'],
          date: doc.data()['date'].toDate().toLocaleString(),
          count: doc.data()['count'],
          measure: doc.data()['measure'],
          systemType: doc.data()['systemType'],
          glassType: doc.data()['glassType'],
          status: doc.data()['status'],
          userUid: doc.data()['user']['uid'],
          name: doc.data()['user']['firstName'] + ' ' + doc.data()['user']['lastName']
        }     
        newRequest.push(record);
          counter++;
      });

    } catch (error) {
      alert(error);
    }
    return newRequest;
  }

  sendBackOffer(data: IDialogShowOfferRequest) {
    const newRequestData: IOffer = {
      userUid: data.userUid,
      name: data.name,
      positionData: data.arrPosition,
      glassType: data.glassType,
      systemType: data.systemType,
      date: new Date(),
      adminTableItemUid: data.uid
    }
    this.addToDb(newRequestData, DB_PATH.SEND_OFFER, false);
  }

  async getMyOfferBack() {
    const userUid = this.userService.getUserUid();
    const myOffers: any = [];
    try {
      let counter = 1;
      const q = query(collection(db, DB_PATH.SEND_OFFER), where('userUid', '==', userUid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const record: IShowOffer = {
          userUid: doc.data()['userUid'],
          name: doc.data()['name'],
          glassType: doc.data()['glassType'],
          systemType: doc.data()['systemType'],
          positionData: doc.data()['positionData'],
          position: counter,
          date: doc.data()['date'].toDate().toLocaleString(),
          id: doc.id,
          adminTableItemUid: doc.data()['adminTableItemUid']
        }
        counter++;
        myOffers.push(record);
      });

    } catch (error) {
      alert(error);
    }
    return myOffers;
  }

  async getMyCompleteOffers() {
    const userUid = this.userService.getUserUid();
    const myOffers: any = [];
    try {
      let counter = 1;
      const q = query(collection(db, DB_PATH.COMPLETE_OFFER), where('userUid', '==', userUid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const record: ICompleteOffer = {
          price: doc.data()['price'],
          date: doc.data()['date'].toDate().toLocaleString(),
          userUid: doc.data()['userUid'],
          adminTableItemUid: doc.data()['adminTableItemUid'],
          status: doc.data()['status']
        }
        counter++;
        myOffers.push(record);
      });

    } catch (error) {
      alert(error);
    }
    
    return myOffers;
  }

  async getNewOrders() {
    const orders: IRowInMyOfferTable[] = [];
    try {
      let counter = 1;
      const q = query(collection(db, DB_PATH.OFFER_REQUEST), where('status', '==', 'approve'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        debugger
        const record: IRowInMyOfferTable = {
          price: doc.data()['price'],
          position: counter,
          userUid: doc.data()['userUid'],
          name: doc.data()['name'],
          glassType: doc.data()['glassType'],
          systemType: doc.data()['systemType'],
          positionData: doc.data()['positionData'],
          date: doc.data()['date'].toDate().toLocaleString(),
          uid: doc.id,
          status: doc.data()['status']
        }     
        orders.push(record);
          counter++;
      });
    } catch (error) {
      alert(error);
    }
    return orders;
  }

  async getAllOrders() {
    const orders: IRowInMyOfferTable[] = [];
    const findStatus: string[] = ['production', 'complete']
    try {
      let counter = 1;
      const q = query(collection(db, DB_PATH.OFFER_REQUEST), where('status', 'in', findStatus));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const record: IRowInMyOfferTable = {
          price: doc.data()['price'],
          position: counter,
          userUid: doc.data()['userUid'],
          name: doc.data()['name'],
          glassType: doc.data()['glassType'],
          systemType: doc.data()['systemType'],
          positionData: doc.data()['positionData'],
          date: doc.data()['date'].toDate().toLocaleString(),
          uid: doc.id,
          status: doc.data()['status']
        }     
        orders.push(record);
          counter++;
      });

    } catch (error) {
      alert(error);
    }
    return orders;
  }

  async completeOffer(data: ICompleteOffer, docId: string) {
    await this.deleteOffer(docId, DB_PATH.SEND_OFFER);
    await this.changeStatus(data.adminTableItemUid!, 'approve');
    this.addToDb(data, DB_PATH.COMPLETE_OFFER, false);
  }

  addToDb(data: object, path: string, needNavigation: boolean) {
    addDoc(collection(db, path), data)
      .then(() => {
        if(needNavigation) {
          this.router.navigate(['/']);
        }
        
      })
      .catch((error) => { alert(error) })
  }

  async changeStatus(uid: string, status: string) {
    const docRef = doc(db, DB_PATH.OFFER_REQUEST, uid);
    try {
      await updateDoc(docRef, { status });
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }

  async updateStatus(adminTableId: string, status: string) {
    const q = query(collection(db, DB_PATH.COMPLETE_OFFER), where('adminTableItemUid', '==', adminTableId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (data) => {
    const docRef = doc(db, DB_PATH.COMPLETE_OFFER, data.id)
      try {
        await updateDoc(docRef, { status });
      } catch(e) {
        alert(e)
      }
    })
  }

  async addPrice(uid: string, price: string) {
    const docRef = doc(db, DB_PATH.OFFER_REQUEST, uid);
    try {
      await updateDoc(docRef, { price });
    } catch (e) {
      console.error('Error updating document: ', e);
    }

  }

  async deleteOffer(uid: string, path: string) {
    try {
      await deleteDoc(doc(db, path, uid));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  }
}
