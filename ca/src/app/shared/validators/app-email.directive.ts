import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { appEmailValidator } from './app-email-validators';

@Directive({
  selector: '[appEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AppEmailDirective,
      multi: true
    }
  ]
})
export class AppEmailDirective implements OnChanges, Validator {

  @Input() appEmail: string = '';

  validator: ValidatorFn = () => null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const appEmailChange = changes['appEmail'];
    console.log(appEmailChange)
    if (appEmailChange) {
      this.validator = appEmailValidator();
    }
  }
 
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

}
