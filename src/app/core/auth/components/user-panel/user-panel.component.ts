import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {

  private readonly _authService = inject(AuthService);
  user$: Observable<User | null> = this._authService.user$;

  logout(): void {
    this._authService.logout()
      .then(() => this._authService.navigateToLoginPage())
      .catch((error) => console.error(error));
  }
}
