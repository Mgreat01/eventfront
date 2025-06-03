import { MapService } from './../../services/map.service';
import { Category } from './../../models/category';
import { EventService } from './../../services/event.service';
import { CommonModule, NgIf } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
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
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

@Component({
  selector: 'app-create-event',
  imports: [NgIf, ReactiveFormsModule, FormsModule, CommonModule, QuillModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent implements AfterViewInit, OnDestroy {
  form: FormGroup;
  step = 1;
  description: string = '';
  categorie: Category[] = [];
  formSubmitted = false;
  private map!: L.Map;
  private marker!: L.Marker;
  address: string = '';
  addressSuggestions: any[] = [];
  showSuggestions = false;
  addressInputFocused = false;

  eventService = inject(EventService);
   mapService = inject(MapService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      basicInfo: this.fb.group({
        title: ['', Validators.required],
        categories: this.fb.array([], Validators.required),
        location: this.fb.group({
          address: ['', Validators.required],
          lat: ['', Validators.required],
          lng: ['', Validators.required]
        }),
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

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
  this.map = L.map('map').setView([-4.322447, 15.307045], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(this.map);

  this.marker = L.marker([-4.322447, 15.307045], {
    draggable: true
  }).addTo(this.map);

  // Si on clique sur la carte
  this.map.on('click', (e: L.LeafletMouseEvent) => {
    this.marker.setLatLng(e.latlng);
    this.form.get('basicInfo.location.lat')?.setValue(e.latlng.lat);
    this.form.get('basicInfo.location.lng')?.setValue(e.latlng.lng);
    this.reverseGeocode(e.latlng.lat, e.latlng.lng);
  });

  // Si on déplace le marqueur
  this.marker.on('dragend', () => {
    const pos = this.marker.getLatLng();
    this.form.get('basicInfo.location.lat')?.setValue(pos.lat);
    this.form.get('basicInfo.location.lng')?.setValue(pos.lng);
    this.reverseGeocode(pos.lat, pos.lng);
  });

  this.map.on('click', (e: L.LeafletMouseEvent) => {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  // Mets à jour ton formulaire
  this.form.get('basicInfo.location.lat')?.setValue(lat);
  this.form.get('basicInfo.location.lng')?.setValue(lng);

  // Affiche dans la console
  console.log('Coordonnées sélectionnées :', { lat, lng });
});

}


  reverseGeocode(lat: number, lng: number): void {
  this.mapService.reverseGeocode(lat, lng).subscribe({
    next: (data) => {
      let address = 'Emplacement personnalisé';

      if (data?.address) {
        address = this.formatAddressForRDC(data.address);
      } else {
        address = `Position personnalisée (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
      }

      this.form.get('basicInfo.location.address')?.setValue(address);
    },
    error: (error) => {
      console.error('Erreur de reverse géocodage:', error);
      this.form.get('basicInfo.location.address')?.setValue(
        `Position personnalisée (${lat.toFixed(6)}, ${lng.toFixed(6)})`
      );
    }
  });
}


private formatAddressForRDC(address: any): string {
  const parts = [];
  if (address.road) parts.push(address.road);
  if (address.quarter) parts.push(address.quarter);
  if (address.city) parts.push(address.city);
  if (address.province) parts.push(address.province);
  if (address.saburb) parts.push(address.saburb);

  if (!parts.length && address.display_name) return address.display_name;
  
  return parts.join(', ') + ', République Démocratique du Congo';
}

geocodeAddress(): void {
  const address = this.form.get('basicInfo.location.address')?.value;
  if (!address) return;

  this.mapService.searchPlaces(address).subscribe({
    next: (results) => {
      if (results && results.length > 0) {
        const firstResult = results[0];
        const lat = parseFloat(firstResult.lat);
        const lng = parseFloat(firstResult.lon);
        

        this.map.setView([lat, lng], 15);
        this.marker.setLatLng([lat, lng]);
        
 
        this.form.get('basicInfo.location.lat')?.setValue(lat);
        this.form.get('basicInfo.location.lng')?.setValue(lng);
        
      
        this.reverseGeocode(lat, lng);
      } else {
        Swal.fire('Erreur', 'Adresse non trouvée', 'error');
      }
      
    },
    error: (error) => {
      console.error('Erreur de géocodage:', error);
      Swal.fire('Erreur', 'Problème lors de la recherche de l\'adresse', 'error');
    }
  });

   console.log('Coordonnées actuelles :', this.form.get('basicInfo.location')?.value);
}





onAddressInput(event: any): void {
  const query = event.target.value;
  if (query && query.length > 2) { 
    this.mapService.searchPlaces(query).subscribe({
      next: (suggestions) => {
        this.addressSuggestions = suggestions;
        this.showSuggestions = this.addressSuggestions.length > 0 && this.addressInputFocused;
      },
      error: (error) => {
        console.error('Erreur de recherche:', error);
        this.addressSuggestions = [];
        this.showSuggestions = false;
      }
    });
  } else {
    this.addressSuggestions = [];
    this.showSuggestions = false;
  }
}
// Méthode pour sélectionner une suggestion
selectSuggestion(suggestion: any): void {
  const addressControl = this.form.get('basicInfo.location.address');
  const latControl = this.form.get('basicInfo.location.lat');
  const lngControl = this.form.get('basicInfo.location.lng');

  if (addressControl && latControl && lngControl) {
    const displayName = suggestion.display_name || suggestion.name;
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);

    addressControl.setValue(displayName);
    latControl.setValue(lat);
    lngControl.setValue(lng);

    
    this.map.setView([lat, lng], 15);
    this.marker.setLatLng([lat, lng]);

    this.addressSuggestions = [];
    this.showSuggestions = false;
  }
}
// Méthodes pour gérer le focus
onAddressFocus(): void {
  this.addressInputFocused = true;
  if (this.form.get('basicInfo.location.address')?.value.length > 2) {
    this.showSuggestions = this.addressSuggestions.length > 0;
  }
}

onAddressBlur(): void {
  setTimeout(() => {
    this.addressInputFocused = false;
    this.showSuggestions = false;
  }, 200);
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
//   submit() {

//      this.formSubmitted = true;
    
//     if (this.form.invalid) {
//       this.markFormGroupTouched(this.form);
//       return;
//     }

//   if(this.form.valid) {
//         const formData = {
//             title: this.form.get('basicInfo.title')?.value ?? '',
//             description: this.form.get('details.description')?.value ?? '',
//             cycle: 'Annual',
//             created_by: 1,
//             date_time_start: this.form.get('ticket.date_time_start')?.value ?? '',
//             date_time_end: this.form.get('ticket.date_time_end')?.value ?? '',
//             category_ids: this.getSelectedCategoryIds(),
//             ticket: []
//         };

//         console.log('Données à envoyer:', formData); 

//         this.eventService.createEvent(formData).subscribe(
//             (response) => {
//                 console.log('Événement créé avec succès:', response);
//                 Swal.fire({
//                     title: 'Succès',
//                     text: 'L\'événement a été créé avec succès !',
//                     icon: 'success',
//                     confirmButtonText: 'OK'
//                 });
//             },
//             (error) => {
//                 console.error("Erreur lors de la création de l'événement:", error);
//                 Swal.fire({
//                     title: 'Erreur',
//                     text: 'Une erreur est survenue lors de la création de l\'événement.',
//                     icon: 'error',
//                     confirmButtonText: 'OK'
//                 });
//             }
//         );
//     } else {
//         console.log('Formulaire invalide', this.form.errors);
//     }
// }
submit() {
    this.formSubmitted = true;
    
    if (this.form.invalid) {
        this.markFormGroupTouched(this.form);
        return;
    }

    if (this.form.valid) {
        const formData = {
            title: this.form.get('basicInfo.title')?.value ?? '',
            description: this.form.get('details.description')?.value ?? '',
            cycle: 'Annual',
            created_by: 1,
            date_time_start: this.form.get('ticket.date_time_start')?.value ?? '',
            date_time_end: this.form.get('ticket.date_time_end')?.value ?? '',
            category_ids: this.getSelectedCategoryIds(),
            address: this.form.get('basicInfo.location.address')?.value ?? '', 
            latitude: this.form.get('basicInfo.location.lat')?.value ?? '',    
            longitude: this.form.get('basicInfo.location.lng')?.value ?? '',  
            ticket: []
        };

        console.log('Données à envoyer:', formData); 

        this.eventService.createEvent(formData).subscribe(
            (response) => {
                console.log('Événement créé avec succès:', response);
                Swal.fire('Succès', 'Événement créé avec succès !', 'success');
            },
            (error) => {
                console.error("Erreur lors de la création:", error);
                Swal.fire('Erreur', 'Échec de la création de l\'événement', 'error');
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