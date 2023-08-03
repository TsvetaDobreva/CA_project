import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetOfferComponent } from './get-offer/get-offer.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';



const routes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: 'getOffers',
                component: GetOfferComponent
            },
            {
                path: 'myOffers',
                component: MyOfferComponent
            },
            {
                path: 'myOrders',
                component: MyOrdersComponent
            }
        ]
    }
];


export const UserRoutingModule = RouterModule.forChild(routes);
