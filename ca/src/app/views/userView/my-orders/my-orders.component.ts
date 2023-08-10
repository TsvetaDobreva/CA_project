import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IFinishedOrderRow } from 'src/app/shared/interfaces/firestoreInterface';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'date'];
  dataSource: IFinishedOrderRow[] = [];

  constructor(private dataStore: DataService) { }

  ngOnInit(): void {

    this.dataStore.getMyCompleteOffers().subscribe((data) => {
      this.dataSource = data.map((x,i) => {
        const row: IFinishedOrderRow = {
          position: i + 1,
          adminTableRelation: x.adminTableRelation,
          date: x.date.toDate().toLocaleString(),
          price: x.price,
          status: x.status,
          userUid: x.userUid
        }
        return row;
      });
    });
  }
}



