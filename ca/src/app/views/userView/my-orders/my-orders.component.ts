import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { IRowInMyOfferTable } from 'src/app/shared/interfaces/offer';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'date'];
  dataSource: IRowInMyOfferTable[] = [];

  constructor(private dataStore: ContactService) { }

  ngOnInit(): void {

    this.dataStore.getMyCompleteOffers().then((data) => {
      this.dataSource = data;
    });
  }
}



