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
                component: GetOfferComponent,
                data: { title: 'Вземи своята оферта'}
            },
            {
                path: 'myOffers',
                component: MyOfferComponent,
                data: { title: 'Моите оферти'}
            },
            {
                path: 'myOrders',
                component: MyOrdersComponent,
                data: { title: 'Моите поръчки'}
            }
        ]
    }
];


export const UserRoutingModule = RouterModule.forChild(routes);
