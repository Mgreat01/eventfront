import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, NgIf, RouterLink, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Liste des centres d'intérêt disponibles
  availableInterests = [
    'Technologie', 'Musique', 'Art', 'Sport', 
    'Voyage', 'Cuisine', 'Cinéma', 'Lecture',
    'Photographie', 'Mode', 'Nature', 'Jeux vidéo'
  ];

  roles = [
    { value: 'public', label: 'Public' },
    { value: 'organisateur', label: 'Organisateur' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      role: ['public', Validators.required],
      nom_organis: [''],
      interests: [[]] // Tableau pour stocker les centres d'intérêt sélectionnés
    }, { validators: this.passwordMatchValidator });

    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      const nomOrganisControl = this.registerForm.get('nom_organis');
      if (role === 'organisateur') {
        nomOrganisControl?.setValidators([Validators.required]);
      } else {
        nomOrganisControl?.clearValidators();
      }
      nomOrganisControl?.updateValueAndValidity();
    });
  }

  // Gestion de la sélection/désélection des centres d'intérêt
  toggleInterest(interest: string): void {
    const interests = this.registerForm.get('interests')?.value as string[];
    const index = interests.indexOf(interest);
    
    if (index === -1) {
      interests.push(interest);
    } else {
      interests.splice(index, 1);
    }
    
    this.registerForm.get('interests')?.setValue([...interests]);
  }

  isInterestSelected(interest: string): boolean {
    return this.registerForm.get('interests')?.value.includes(interest);
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  async onRegister(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    try {
      const formData = { ...this.registerForm.value };

      if (formData.role !== 'organisateur') {
        delete formData.nom_organis;
      }

      await this.userService.registerUser(formData);

      this.successMessage = 'Inscription réussie ! Veuillez vous connecter.';
      this.registerForm.reset({ role: 'public', interests: [] });

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error: any) {
      this.errorMessage = error?.error?.message || 'Erreur lors de l\'inscription.';
    } finally {
      this.isLoading = false;
    }
  }

  loginWithGoogle() {
    this.userService.socialLogin('google'); 
  }

  loginWithFacebook() {
    this.userService.socialLogin('facebook'); 
  }
}





















