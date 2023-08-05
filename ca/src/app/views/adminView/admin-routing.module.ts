import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';


const routes: Routes = [
    {
        path: 'admin',
        children: [
            {
                path: 'allOrders',
                component: AllOrdersComponent,
                data: { title: 'Всички поръчки'}
            },
            {
                path: 'newOffers',
                component: NewOffersComponent,
                data: { title: 'Запитвания за оферти'}
            },
            {
                path: 'newOrders',
                component: NewOrdersComponent,
                data: { title: 'Нови поръчки'}
            }
        ]
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);
