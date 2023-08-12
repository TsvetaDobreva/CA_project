import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { DB_STATUS } from 'src/app/shared/constant/dbStatus';
import { IAdminTableRow } from 'src/app/shared/interfaces/firestoreInterface';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'price', 'status', 'action', 'date'];
  dataSource: IAdminTableRow[] = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private dataStore: DataService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataStore.getAllOrders().subscribe((data) => {
      this.dataSource = data.map((x, i) => {
         x.date = x.date.toDate().toLocaleString(); 
        return Object.assign(x, {position: i + 1})
      })
    });
  }

  moveToComplete(element: IAdminTableRow) {
    this.dataStore.changeStatus(element.id, DB_STATUS.COMPLETE);
    this.dataStore.updateStatus(element.id, DB_STATUS.COMPLETE);
    this.openSnackBar('Успешно завършихте поръчката!')
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}
