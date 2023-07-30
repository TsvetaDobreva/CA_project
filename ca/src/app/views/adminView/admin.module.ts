import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { ConfirmOffersComponent } from './confirm-offers/confirm-offers.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CompleteOffersComponent } from './complete-offers/complete-offers.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    NewOffersComponent,
    AllOffersComponent,
    ConfirmOffersComponent,
    CompleteOffersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule
  ]
})
export class AdminModule { }
