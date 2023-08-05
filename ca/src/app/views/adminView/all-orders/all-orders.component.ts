import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { IRowInMyOfferTable } from 'src/app/shared/interfaces/offer';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'action', 'date'];
  dataSource: IRowInMyOfferTable[] = [];

  constructor(private dataStore: ContactService) { }

  ngOnInit(): void {
    this.dataStore.getAllOrders().then((data) => {
      this.dataSource = data;
    });
  }

  moveToComplete(element: IRowInMyOfferTable) {
    this.dataStore.changeStatus(element.uid, 'complete');
    this.dataStore.updateStatus(element.uid, 'complete');
  }
}
