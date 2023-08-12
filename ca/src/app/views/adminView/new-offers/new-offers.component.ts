import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataService } from 'src/app/services/data.service';
import { IAdminOfferDialog, IAdminTableRow, IPositionPrice } from '../../../shared/interfaces/firestoreInterface';
import { MatDialog } from '@angular/material/dialog';
import { NewOfferDialogComponent } from '../new-offer-dialog/new-offer-dialog.component';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.component.html',
  styleUrls: ['./new-offers.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})

export class NewOffersComponent implements OnInit {
  arrPosition: IAdminOfferDialog | undefined;
  dataSource: IAdminTableRow[] = [];
  columnsToDisplay = ['position', 'email', 'date'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null = null;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private dataStore: DataService, public dialog: MatDialog, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.dataStore.getNewRequest().subscribe((data) => {
      this.dataSource = data.map((x, i) => {
        const row: IAdminTableRow = {
          id: x.id,
          position: i + 1,
          date: x.date.toDate().toLocaleString(),
          count: x.count,
          status: x.status,
          userData: x.userData,
          measure: x.measure,
          glassType: x.glassType,
          systemType: x.systemType,
          email: x.userData.email
        }
        return row
      });
    });
  }

  openDialog(element: IAdminTableRow): void {
    const emptyInfo: IPositionPrice = { measure: '', price: '' }
    const emptyArray = [];
    for (let i = 0; i < element.count; i++) {
      emptyArray.push(JSON.parse(JSON.stringify(emptyInfo)))
    }
    emptyArray.map((value) => value = emptyInfo)
    const dialogRef = this.dialog.open(NewOfferDialogComponent, {
      data: Object.assign(element, { positionData: emptyArray })
    });

    dialogRef.afterClosed().subscribe(result => {
      let totalPrice = 0;
  
      result.positionData.forEach((pos: any) => {
        totalPrice += Number(pos.price);
      })
      this.dataStore.addPrice(result.id, totalPrice.toString()).then(() => {
        this.dataStore.changeStatus(result.id, 'send').then(() => {
          this.dataStore.sendBackOffer(result).then(() => {
            this.openSnackBar('Успшно изпратихте оферта!');
          });
        })
      })
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}

