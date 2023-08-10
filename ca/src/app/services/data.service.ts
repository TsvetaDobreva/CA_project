/********* angular *********/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

/********* interface and constants *********/
import { IAdminOfferDialog, IContactMsg, IFinishedOrder,IAdminTable, IOffer } from '../shared/interfaces/firestoreInterface';
import { DB_PATH } from '../shared/constant/dbPath';

/********* services *********/
import { UserService } from './user.service';

/********* firebase *********/
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) { }

  /*****************CREATE**********************/
  

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
  };

  createNewRequest(count: number, measure: string, systemType: string, glassType: string) {
    const newRequestData: IAdminTable = {
      date: new Date(),
      count,
      status: 'new',
      userData: this.userService.user,
      measure,
      glassType,
      systemType
    };
    this.addToDb(newRequestData, DB_PATH.ADMIN_TABLE, true);
  };

  addToDb(data: object, path: string, needNavigation: boolean) {
    const tableRelation = this.afs.collection(path);
    tableRelation.add(data).then(() => {
      if (needNavigation) {
        this.router.navigate(['/']);
      }
    })
      .catch((error) => { alert(error) });
  };

  completeOffer(data: IFinishedOrder, docId: string) {
    this.changeStatus(data.adminTableRelation, 'approve').then(() => {
      this.afs.collection(DB_PATH.SEND_OFFER).doc(docId).delete().then(() => {
        this.addToDb(data, DB_PATH.FINISHED_ORDERS, false);
      }).catch((error) => {
        alert(error);
      })
    }).catch((error) => {
      alert(error);
    })
  };

  sendBackOffer(data: IAdminOfferDialog) {
    const newRequestData: IOffer = {
      userUid: data.userData.uid,
      name: data.userData.firstName + ' ' + data.userData.lastName,
      glassType: data.glassType,
      systemType: data.systemType,
      positionData: data.positionData,
      date: new Date(),
      adminTableRelation: data.id
    };
    this.addToDb(newRequestData, DB_PATH.SEND_OFFER, false);
  };


  /*****************GET**********************/


  getNewRequest(): Observable<any[]> {
    const adminTableRef = this.afs.collection<any>(DB_PATH.ADMIN_TABLE, ref => ref.where('status', '==', 'new'));
    return adminTableRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
  };

  getMyOfferBack() {
    const userUid = this.userService.getUserUid();
    const sendOfferTableRef = this.afs.collection<any>(DB_PATH.SEND_OFFER, ref => ref.where('userUid', '==', userUid));
    return sendOfferTableRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
  };

  getMyCompleteOffers() {
    const userUid = this.userService.getUserUid();
    const finishOrdersTableRef = this.afs.collection<any>(DB_PATH.FINISHED_ORDERS, ref => ref.where('userUid', '==', userUid));

    return finishOrdersTableRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
  };

  getNewOrders() {
    const adminTableRef = this.afs.collection<any>(DB_PATH.ADMIN_TABLE, ref => ref.where('status', '==', 'approve'));

    return adminTableRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    );
  };

  getAllOrders() {
    const findStatus: string[] = ['production', 'complete']
    const adminTableRef = this.afs.collection<any>(DB_PATH.ADMIN_TABLE, ref => ref.where('status', 'in', findStatus));

    return adminTableRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  };


   /*****************UPDATE**********************/


  addPrice(uid: string, price: string) {
    const adminTableRef = this.afs.collection(DB_PATH.ADMIN_TABLE);
    return adminTableRef.doc(uid).update({ price });
  };

  changeStatus(uid: string, status: string) {
    const adminTableRef = this.afs.collection(DB_PATH.ADMIN_TABLE);
    return adminTableRef.doc(uid).update({ status, date: new Date() });
  };

  updateStatus(adminTableRelation: string, status: string) {
    const finishOrderRef = this.afs.collection<any>(DB_PATH.FINISHED_ORDERS, ref => ref.where('adminTableRelation', '==', adminTableRelation));
    finishOrderRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    ).subscribe(data => {
      data.forEach(x => {
        const docRef = this.afs.collection(DB_PATH.FINISHED_ORDERS, ref => ref.where('uid', '==', x.id));
        docRef.doc(x.id).update({ status })
      })
    });
  };


   /*****************DELETE**********************/


  deleteOffer(uid: string, path: string) {
    const docRef = this.afs.collection(path, ref => ref.where('uid', '==', uid));
    docRef.doc(uid).delete()
  };
}

