import { ChangeDetectionStrategy, Component, OnDestroy, Signal, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import {  Router, RouterLink, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {

  readonly FB = inject(FormBuilder);
  readonly router = inject(Router);
  readonly authService = inject(AuthService);

  private destroy$ = new Subject<void>();

  errorMessageS: WritableSignal<string | null> = signal<string | null>(null);

  readonly loginForm = this.FB.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }) 


  uponSubmit(): void {
    const rawValue = this.loginForm.getRawValue();
    this.authService.login(rawValue.email, rawValue.password).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.router.navigateByUrl('/converter');
      },
      error: ({code}) => {
        if (code === 'auth/invalid-credential') {
          this.errorMessageS.set(`Server has stated an issue which refer to, ${code.replace('auth/', '').replace('-', ' ')}`);
        }
  }})
  }

  navigateToRegisterPage($event: Event): void {
    $event.preventDefault();
    this.router.navigateByUrl('auth/register');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
