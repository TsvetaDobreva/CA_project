import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { IRowInMyOfferTable, IShowConfirmOfferInTable } from 'src/app/shared/interfaces/offer';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'action', 'date'];
  dataSource: IRowInMyOfferTable[] = [];

  constructor(private dataStore: ContactService) { }

  ngOnInit(): void {
    this.dataStore.getNewOrders().then((data) => {
      this.dataSource = data;
    });
  }

  moveToProduction(element: IRowInMyOfferTable) {
    this.dataStore.changeStatus(element.uid, 'production');
    this.dataStore.updateStatus(element.uid, 'production');
  }
}
