import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  imports: [ReactiveFormsModule, NgIf],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) return;

    this.isLoading = true;
    this.error = '';
    this.message = '';

    const email = this.forgotPasswordForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Un lien de réinitialisation a été envoyé à votre adresse email.';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Une erreur est survenue.';
        this.isLoading = false;
      }
    });
  }
}
