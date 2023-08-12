import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEmailDirective } from './validators';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MaterialModule } from '../material/material.module';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    // AppEmailDirective,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    // AppEmailDirective,
    SnackBarComponent
  ],
  providers: [ { provide: MAT_SNACK_BAR_DATA, useValue: {} }]
})
export class SharedModule { }
