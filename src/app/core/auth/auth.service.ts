import { Injectable, signal } from '@angular/core';
import { AuthUser, Role } from '../models';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<AuthUser | null>(null);

  constructor(private storage: StorageService) {
    this.user.set(this.load());
  }

  private load(): AuthUser | null {
    try {
      const raw = this.storage.get('auth_user', []);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  private save(u: AuthUser | null) {
    if (u) this.storage.set('auth_user', JSON.stringify(u));
    else this.storage.remove('auth_user');
    this.user.set(u);
  }

  login(u: AuthUser) {
    this.save(u);
  }

  logout() {
    this.save(null);
  }

  hasRole = (roles: Role[]) => {
    const u = this.user();
    return !!u && roles.includes(u.role);
  };
}
