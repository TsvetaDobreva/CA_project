import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function sameValueGroupValidator(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl) => {
        const group = control as FormGroup;
        const ctrl1 = group.get(controlName1);
        const ctrl2 = group.get(controlName2);
        
        const isSame = ctrl1?.value === ctrl2?.value;

        isSame ? null : group.get(controlName2)?.setErrors({ matching: true });
        return isSame ? null : { matching: true };
    };
};


