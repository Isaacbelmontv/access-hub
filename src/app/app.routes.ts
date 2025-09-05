import { Routes } from '@angular/router';
import { canActivateAuth } from './core/auth/auth-guard';
import { loginGuard } from '@core/auth/login-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./features/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'users',
    canActivate: [canActivateAuth],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/users/users.page').then((m) => m.UsersPage),
      },
    ],
  },
];
