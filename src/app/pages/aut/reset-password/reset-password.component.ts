import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [ReactiveFormsModule,NgIf],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  token: string = '';
  isLoading = false;
  message: string = '';
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: UserService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  this.token = this.route.snapshot.queryParamMap.get('token') || '';
  const emailParam = this.route.snapshot.queryParamMap.get('email');
  if (emailParam) {
    this.resetPasswordForm.addControl('email', this.fb.control(emailParam, [Validators.required, Validators.email]));
  }
}

onSubmit() {
  if (this.resetPasswordForm.invalid) return;

  const { email, password, confirmPassword } = this.resetPasswordForm.value;

  if (password !== confirmPassword) {
    this.error = 'Les mots de passe ne correspondent pas.';
    return;
  }

  this.isLoading = true;
  this.error = '';
  this.message = '';

  this.authService.resetPassword(this.token, email, password, confirmPassword).subscribe({
    next: (res: any) => {
      this.message = res.status || 'Mot de passe réinitialisé avec succès.';
      this.isLoading = false;
      setTimeout(() => this.router.navigate(['/login']), 2500);
    },
    error: (err) => {
      this.error = err.error?.message || 'Une erreur est survenue.';
      this.isLoading = false;
    }
  });
}
}