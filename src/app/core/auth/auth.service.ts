import { Injectable, signal } from '@angular/core';
import { AuthUser, Role } from '@core/models';
import { StorageService } from '@core/storage/storage.service';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<AuthUser | null>(null);
  private initialized = signal(false);
  isInitialized = this.initialized.asReadonly();

  constructor(private storageService: StorageService) {
    this.restore();
  }

  login(user: AuthUser) {
    this._user.set(user);
    this.storageService.set('auth_user', JSON.stringify(user));
  }

  user() {
    return this._user();
  }

  logout() {
    this._user.set(null);
    this.storageService.remove('auth_user');
  }

  getUser(): AuthUser | null {
    return this._user();
  }

  isLoggedIn(): boolean {
    return !!this._user();
  }

  hasRole = (roles: Role[]): boolean => {
    const u = this._user();
    return !!u && roles.includes(u.role);
  };

  private restore() {
    const raw = this.storageService.get('auth_user');
    if (raw) {
      this._user.set(JSON.parse(raw));
    } else {
      this.initialized.set(true);
    }

    setTimeout(() => {
      this.initialized.set(true);
    }, 2000);
  }
}
