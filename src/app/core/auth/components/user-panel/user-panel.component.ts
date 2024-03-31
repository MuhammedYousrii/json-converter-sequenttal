import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPanelComponent {

  private readonly _authService = inject(AuthService);

  logout(): void {
    this._authService.logout()
      .then(() => this._authService.navigateToLoginPage())
      .catch((error) => console.error(error));
  }
}
