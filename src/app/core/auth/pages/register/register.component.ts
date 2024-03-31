import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  readonly FB = inject(FormBuilder);
  readonly router = inject(Router);
  readonly authService = inject(AuthService);

  errorMessage: string | null = null;
  private destroy$ = new Subject<void>();

  readonly registerForm = this.FB.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }) 


  uponSubmit(): void {
    const rawValue = this.registerForm.getRawValue();
    this.authService.register(rawValue.email, rawValue.username, rawValue.password).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => this.router.navigateByUrl('converter'),
      error: (error) => { 
        this.errorMessage = error.message; 
      }

    });
  }

  navigateToLoginPage($event: Event): void {
    $event.preventDefault();
    this.router.navigateByUrl('auth/login');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
