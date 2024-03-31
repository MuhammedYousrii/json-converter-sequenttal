import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  readonly FB = inject(FormBuilder);
  readonly router = inject(Router);
  readonly authService = inject(AuthService);

  errorMessage: string | null = null;

  readonly registerForm = this.FB.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }) 


  uponSubmit(): void {
    const rawValue = this.registerForm.getRawValue();
    this.authService.register(rawValue.email, rawValue.username, rawValue.password).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (error) => { 
        this.errorMessage = error.message; 
      }

    });
  }
}
