import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppEmailDirective } from './validators';


@NgModule({
  declarations: [
    AppEmailDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppEmailDirective
  ]
})
export class SharedModule { }
