import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(): ValidatorFn {
    const emailRegex = new RegExp(`/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`);
    return (control) => {
        return (control.value === '' || emailRegex.test(control.value)) ? null : {appEmailValidator: true}
    }
}
