import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAdminOfferDialog } from 'src/app/shared/interfaces/firestoreInterface';

@Component({
  selector: 'app-new-offer-dialog',
  templateUrl: './new-offer-dialog.component.html',
  styleUrls: ['./new-offer-dialog.component.css']
})

export class NewOfferDialogComponent {
  index: number = 0;
  
  constructor(
    public dialogRef: MatDialogRef<NewOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAdminOfferDialog,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  trackByFn(index: number, item: any) {
    return index;  
  }
}





