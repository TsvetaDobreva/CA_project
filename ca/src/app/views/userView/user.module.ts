import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetOfferComponent } from './get-offer/get-offer.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GetOfferComponent,
    MyOfferComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
