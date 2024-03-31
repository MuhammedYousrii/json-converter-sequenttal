import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { firstValueFrom } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return firstValueFrom(authService.user$).then((user) => { 
    if (!user) return true;
    router.navigateByUrl('/converter');
    return false;
  })
};