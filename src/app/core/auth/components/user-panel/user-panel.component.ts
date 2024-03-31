import { Component, inject } from '@angular/core';
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
  styles: [],
})
export class UserPanelComponent {

  authService = inject(AuthService);
  router = inject(Router);
  user$ = this.authService.user$;

  logout(): void {
    this.authService.logout()
      .subscribe({ 
        next:  () => this.router.navigateByUrl('/auth/login'),
        error: error => console.error('Error logging out:', error)
      });
  }
}
