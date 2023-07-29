import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm = this.fb.group({
    email: [''],
    phone: [''],
    firstName: [''],
    lastName: [''],
    text: [''],
  });

  constructor(private fb: FormBuilder, private contactService: ContactService) {}

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const phone = formData.value.phone;
    const firstName = formData.value.firstName;
    const lastName = formData.value.lastName;
    const text = formData.value.text
    this.contactService.createNewContactMsg(email, phone, firstName, lastName, text);
    formDirective.resetForm();
    this.contactForm.reset();
  }

}
