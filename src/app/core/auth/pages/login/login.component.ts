import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  private readonly _FB = inject(FormBuilder);
  private readonly _authService = inject(AuthService);


  errorMessageS: WritableSignal<string | null> = signal<string | null>(null);

  readonly loginForm = this._FB.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this._authService.passwordValidatePattern)]],
  }) 


  uponSubmit(): void {
    const rawValue = this.loginForm.getRawValue();
    this._authService.login(rawValue.email, rawValue.password).
    then(() => this._authService.navigateToHomePage())
    .catch(({code}) => {
        if (code === 'auth/invalid-credential') {
          this.errorMessageS.set(`Server has stated an issue which refer to, ${code.replace('auth/', '').replace('-', ' ')}`);
        }
      });
  }

  navigateToRegisterPage($event: Event): void {
    $event.preventDefault();
    this._authService.navigateToRegisterPage();
  }
}
