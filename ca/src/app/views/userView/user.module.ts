import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetOfferComponent } from './get-offer/get-offer.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { ContactsComponent } from './contacts/contacts.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    GetOfferComponent,
    MyOfferComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
