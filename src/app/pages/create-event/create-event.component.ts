import { Category } from './../../models/category';
import { EventService } from './../../services/event.service';
import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormArray,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-create-event',
  imports: [NgIf, ReactiveFormsModule, FormsModule, CommonModule, QuillModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  form: FormGroup;
  step = 1;
  description: string = '';
  categorie: Category[] = [];
  formSubmitted = false;


  eventService = inject(EventService);

  constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    basicInfo: this.fb.group({
      title: ['', Validators.required],
      categories: this.fb.array([], Validators.required),
    }),
    details: this.fb.group({
      description: ['', Validators.required],
    }),
    ticket: this.fb.group({
      ticketTypes: [[]],
      date_time_start: ['', [Validators.required, this.futureDateValidator()]],
      date_time_end: ['', Validators.required],
    },
    { validators: this.dateRangeValidator.bind(this) })
  });
}


  get categories(): FormArray {
    return this.form.get('basicInfo.categories') as FormArray;
  }

  onCategoryChange(event: any) {
    const selectedOptions = Array.from(
      event.target.selectedOptions
    ) as HTMLOptionElement[];
    this.categories.clear();

    selectedOptions.forEach((option) => {
      this.categories.push(this.fb.control(option.value)); 
    });

    console.log(this.categories.value);
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

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.eventService.getCategories().subscribe(
      (response: any) => {
        this.categorie = response.data; 
        console.log(this.categorie); 
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }
  submit() {

     this.formSubmitted = true;
    
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

  if(this.form.valid) {
        const formData = {
            title: this.form.get('basicInfo.title')?.value ?? '',
            description: this.form.get('details.description')?.value ?? '',
            cycle: 'Annual',
            created_by: 1,
            date_time_start: this.form.get('ticket.date_time_start')?.value ?? '',
            date_time_end: this.form.get('ticket.date_time_end')?.value ?? '',
            category_ids: this.getSelectedCategoryIds(),
            ticket: []
        };

        console.log('Données à envoyer:', formData); 

        this.eventService.createEvent(formData).subscribe(
            (response) => {
                console.log('Événement créé avec succès:', response);
                Swal.fire({
                    title: 'Succès',
                    text: 'L\'événement a été créé avec succès !',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            },
            (error) => {
                console.error("Erreur lors de la création de l'événement:", error);
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur est survenue lors de la création de l\'événement.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        );
    } else {
        console.log('Formulaire invalide', this.form.errors);
    }
}

getSelectedCategoryIds(): number[] {
    const categoryArray = this.form.get('basicInfo.categories') as FormArray;
    return categoryArray.controls.map(control => control.value).filter(id => id); 
}

/* validation date  */


futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return selectedDate < today ? { pastDate: true } : null;
  };
}

// Validateur pour vérifier que la date de fin est après la date de début
dateRangeValidator(control: AbstractControl): ValidationErrors | null {
  const startDateCtrl = control.get('date_time_start');
  const endDateCtrl = control.get('date_time_end');
  
  if (!startDateCtrl || !endDateCtrl) {
    return null;
  }
  

  const startDate = startDateCtrl.value ? new Date(startDateCtrl.value) : null;
  const endDate = endDateCtrl.value ? new Date(endDateCtrl.value) : null;
  
  if (!startDate || !endDate) {
    return null;
  }
  
  return endDate < startDate ? { dateRange: true } : null;
}
private markFormGroupTouched(formGroup: FormGroup | FormArray) {
  Object.values(formGroup.controls).forEach(control => {
    control.markAsTouched();

    if (control instanceof FormGroup || control instanceof FormArray) {
      this.markFormGroupTouched(control);
    }
  });
}


}
