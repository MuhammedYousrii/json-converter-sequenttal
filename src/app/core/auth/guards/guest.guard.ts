import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';


/**
 * @description Check If current user is authenticated or not and behave accordingly
 * @note It depends on the business requirement, where we should protect Guest routes or not
 * @returns {CanActivateFn}
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return firstValueFrom(authService.user$).then((user) => { 
    if (!user) return true;
    authService.navigateToHomePage();
    return false;
  })
};