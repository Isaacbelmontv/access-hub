import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { LanguageService } from '@core/api/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Badge } from 'primeng/badge';
import { Button, ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AuthService } from './core/auth/auth.service';
import { SplashscreenComponent } from './features/splash/splashscreen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Button,
    Menu,
    ButtonModule,
    Badge,
    SplashscreenComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('access-hub');
  items: MenuItem[] = [];

  get langs() {
    return this.languageService.langs;
  }

  get currentLang() {
    return this.languageService.currentLang();
  }

  constructor(
    protected authService: AuthService,
    private router: Router,
    private languageService: LanguageService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.buildMenu();
  }

  private buildMenu() {
    this.items = [
      {
        label: this.translate.instant('HEADER.ACCOUNT'),
        items: [
          {
            label: this.translate.instant('HEADER.LOGOUT'),
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

  switchLang(lang: string) {
    this.languageService.switchLang(lang);
  }
}
