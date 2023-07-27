import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOffersComponent } from './all-offers/all-offers.component';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { ConfirmOffersComponent } from './confirm-offers/confirm-offers.component';
import { CompleteOffersComponent } from './complete-offers/complete-offers.component';



const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'allOffers',
                component: AllOffersComponent
            },
            {
                path: 'newOffers',
                component: NewOffersComponent
            },
            {
                path: 'confirmOffers',
                component: ConfirmOffersComponent
            },
            {
                path: 'completeOffers',
                component: CompleteOffersComponent
            }
        ]
    }
];


export const AdminRoutingModule = RouterModule.forChild(routes);
