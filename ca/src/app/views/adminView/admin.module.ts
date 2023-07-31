import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { ConfirmOffersComponent } from './confirm-offers/confirm-offers.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CompleteOffersComponent } from './complete-offers/complete-offers.component';
import { MaterialModule } from 'src/app/material/material.module';
import { NewOfferDialogComponent } from './new-offer-dialog/new-offer-dialog.component';



@NgModule({
  declarations: [
    NewOffersComponent,
    AllOffersComponent,
    ConfirmOffersComponent,
    CompleteOffersComponent,
    NewOfferDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
