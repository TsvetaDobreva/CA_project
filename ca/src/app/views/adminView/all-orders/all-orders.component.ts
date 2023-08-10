import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IAdminTableRow } from 'src/app/shared/interfaces/firestoreInterface';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'action', 'date'];
  dataSource: IAdminTableRow[] = [];

  constructor(private dataStore: DataService) { }

  ngOnInit(): void {
    this.dataStore.getAllOrders().subscribe((data) => {
      this.dataSource = data.map((x, i) => {
         x.date = x.date.toDate().toLocaleString(); 
        return Object.assign(x, {position: i + 1})
      })
    });
  }

  moveToComplete(element: IAdminTableRow) {
    this.dataStore.changeStatus(element.id, 'complete');
    this.dataStore.updateStatus(element.id, 'complete');
  }
}
