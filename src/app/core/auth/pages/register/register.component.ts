import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly _FB = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

  errorMessageS: WritableSignal<string | null> = signal<string | null>(null);

  readonly registerForm = this._FB.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  }) 


  uponSubmit(): void {
    const rawValue = this.registerForm.getRawValue();
    this._authService.register(rawValue.email, rawValue.username, rawValue.password)
    .then(() => this._authService.navigateToHomePage())
    .catch((error) => {
      this.errorMessageS.set(error.code); 
    });
  }

  navigateToLoginPage($event: Event): void {
    $event.preventDefault();
    this._authService.navigateToLoginPage();
  }

}
