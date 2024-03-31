import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import {  Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  readonly FB = inject(FormBuilder);
  readonly router = inject(Router);
  readonly authService = inject(AuthService);

  errorMessage: string | null = null;

  readonly loginForm = this.FB.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }) 


  uponSubmit(): void {
    const rawValue = this.loginForm.getRawValue();
    this.authService.login(rawValue.email, rawValue.password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => this.errorMessage = error.message
    });
  }

  navigateToRegisterPage($e: Event): void {
    $e.preventDefault();
    this.router.navigateByUrl('/register');
  }
}
