import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const canActivateRole = (roles: ('manager' | 'coordinator')[]): CanActivateFn => {
  return () => inject(AuthService).hasRole(roles);
};
