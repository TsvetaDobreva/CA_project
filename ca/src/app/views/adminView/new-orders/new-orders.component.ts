import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { DB_STATUS } from 'src/app/shared/constant/dbStatus';
import { IAdminTableRow } from 'src/app/shared/interfaces/firestoreInterface';


@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'action', 'date'];
  dataSource: IAdminTableRow[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private dataStore: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
    this.dataStore.changeStatus(element.id, DB_STATUS.PRODUCTION);
    this.dataStore.updateStatus(element.id, DB_STATUS.PRODUCTION);
    this.openSnackBar('Преместихте поръчката за производство!');
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
