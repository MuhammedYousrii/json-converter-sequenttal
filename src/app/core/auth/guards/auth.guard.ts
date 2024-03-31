import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

/**
 * @description Check If current user is authenticated or not and behave accordingly
 * @returns {CanActivateFn}
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return firstValueFrom(authService.user$).then((user) => { 
    if (user) return true;
    authService.navigateToLoginPage();
    return false;
  })
};
