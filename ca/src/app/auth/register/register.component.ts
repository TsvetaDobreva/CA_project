import { Component } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { appEmailValidator, sameValueGroupValidator } from 'src/app/shared/validators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rePassword: ['', ],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    company: ['',]
  },{
    validators: sameValueGroupValidator('password', 'rePassword')
  })


  fieldRequired: string = "This field is required"

  constructor(private fb: FormBuilder, private auth: UserService) { }

  get formCheck(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  emaiErrors() {
    return this.registerForm.get('email')?.hasError('required') ? 'This field is required' :
      this.registerForm.get('email')?.hasError('pattern') ? 'Not a valid emailaddress' : ''
  }
  
  checkPassword(control: FormControl) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }
  getErrorPassword() {
    return this.registerForm.get('password')?.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm.get('password')?.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }
  checkValidation(input: string) {
    const validation = this.registerForm.get(input)?.invalid && (this.registerForm.get(input)?.dirty || this.registerForm.get(input)?.touched)
    return validation;
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const password = formData.value.pass.password;
    const firstName = formData.value.firstName;
    const lastName = formData.value.lastName;
    const company = formData.value.company;
    this.auth.register(email, password, firstName, lastName, company);
    formDirective.resetForm();
    this.registerForm.reset();
  }
}

