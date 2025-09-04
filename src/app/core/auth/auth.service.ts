import { Injectable, signal } from '@angular/core';
import { AuthUser, Role } from '../models';
import { StorageService } from '../storage/storage.service';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user = signal<AuthUser | null>(null);

  constructor(private storage: StorageService) {
    this.user.set(this.load());
  }

  private load(): AuthUser | null {
    const raw = this.storage.get('auth_user', []);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  private save(u: AuthUser | null): void {
    if (u) this.storage.set('auth_user', JSON.stringify(u));
    else this.storage.remove('auth_user');
    this.user.set(u);
  }

  login = (u: AuthUser) => this.save(u);

  logout = () => this.save(null);

  getUser = (): AuthUser | null => this.user();

  getUserName = (): string | undefined => this.user()?.username;

  isLoggedIn = (): boolean => !!this.user();

  hasRole = (roles: Role[]): boolean => {
    const u = this.user();
    return !!u && roles.includes(u.role);
  };
}
