import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private dataStore: DataService) {}

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective) {
    const count = formData.value.count;
    const measure = formData.value.measure;
    const systemType = formData.value.systemType;
    const glassType = formData.value.glassType;

    this.dataStore.createNewRequest(count, measure, systemType, glassType);
    formDirective.resetForm();
    this.getOfferForm.reset();
  }
}

