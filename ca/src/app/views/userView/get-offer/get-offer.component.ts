import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-get-offer',
  templateUrl: './get-offer.component.html',
  styleUrls: ['./get-offer.component.css']
})

export class GetOfferComponent {
  getOfferForm = this.fb.group({
    count: ['', [Validators.required]],
    measure: ['', [Validators.required]],
    systemType: ['', [Validators.required]],
    glassType: ['', [Validators.required]]
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private fb: FormBuilder, private dataStore: DataService, private _snackBar: MatSnackBar) {}

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective) {
    const count = formData.value.count;
    const measure = formData.value.measure;
    const systemType = formData.value.systemType;
    const glassType = formData.value.glassType;

    this.dataStore.createNewRequest(count, measure, systemType, glassType).then(() => {
      this.openSnackBar('Успешно поискахте оферта!')
    }).catch((error) => {
      this.openSnackBar('Възникна грешка! Моля, опитайте по-късно!')
    });
    formDirective.resetForm();
    this.getOfferForm.reset();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }
}

