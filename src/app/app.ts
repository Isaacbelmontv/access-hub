import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Badge } from 'primeng/badge';
import { Button, ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AuthService } from './core/auth/auth.service';
import { SplashscreenComponent } from './features/splash/splashscreen.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, Menu, ButtonModule, Badge, SplashscreenComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('access-hub');
  items: MenuItem[] | undefined;

  constructor(protected authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Mi cuenta',
        items: [
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  hasLogin() {
    return this.authService.isLoggedIn();
  }
}
