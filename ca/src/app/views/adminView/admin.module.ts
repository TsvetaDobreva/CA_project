import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NewOfferDialogComponent } from './new-offer-dialog/new-offer-dialog.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';



@NgModule({
  declarations: [
    NewOffersComponent,
    NewOfferDialogComponent,
    NewOrdersComponent,
    AllOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
