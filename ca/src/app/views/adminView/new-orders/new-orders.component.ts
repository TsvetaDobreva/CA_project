import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IAdminTableRow } from 'src/app/shared/interfaces/firestoreInterface';


@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'action', 'date'];
  dataSource: IAdminTableRow[] = [];

  constructor(private dataStore: DataService) { }

  ngOnInit(): void {
    const tempData:any = [];
    this.dataStore.getNewOrders().subscribe(data => {
      this.dataSource = data.map( (x, i) => {
        return {
              id: x.id,
              position: i + 1,
              email: x.userData.email,
              date: x.date.toDate().toLocaleString(),
              count: x.count,
              status: x.status,
              userData: x.userData,
              measure: x.measure,
              glassType: x.glassType,
              systemType: x.systemType,
              price: x.price + 'лв'
            }
      })  
    })
  }

  moveToProduction(element: IAdminTableRow) {
    this.dataStore.changeStatus(element.id, 'production');
    this.dataStore.updateStatus(element.id, 'production');
  }
}
