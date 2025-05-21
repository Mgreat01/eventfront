import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.snow.css';

import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-event',
  imports: [NgIf, ReactiveFormsModule, FormsModule, CommonModule, QuillModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  form: FormGroup;
  step = 1;
  description: string = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      basicInfo: this.fb.group({
        title: ['', Validators.required],
        category: ['', Validators.required],
        eventType: ['physical', Validators.required],
      }),
      details: this.fb.group({
        description: ['', Validators.required],
      }),
      tickets: this.fb.group({
        ticketType: ['free', Validators.required],
      }),
    });
  }

 nextStep() {
    if (this.step < 4) {
        this.step++;
    }
}

previousStep() {
    if (this.step > 1) {
        this.step--;
    }
}
  submit() {
    if (this.form.valid) {
      console.log('Formulaire soumis :', this.form.value);
      console.log('Description :', this.description);
    }
  }
}
