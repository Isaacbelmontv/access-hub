import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const canActivateAuth: CanActivateFn = () => {
  const auth = inject(AuthService),
    router = inject(Router);
  if (!auth.getUser()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
