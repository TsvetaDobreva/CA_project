import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetOfferComponent } from './get-offer/get-offer.component';
import { MyOfferComponent } from './my-offer/my-offer.component';
import { ContactsComponent } from './contacts/contacts.component';



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
                path: 'contacts',
                component: ContactsComponent
            }
        ]
    }
];


export const UserRoutingModule = RouterModule.forChild(routes);
