import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '@core/api/language.service';
import { AuthService } from '@core/auth/auth.service';
import { AuthUser } from '@core/models';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    TranslateModule,
  ],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  username = '';
  password = '';
  error = signal(false);

  get langs() {
    return this.language.langs;
  }

  get currentLang() {
    return this.language.currentLang();
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    public language: LanguageService
  ) {}

  onSubmit() {
    this.http.get<AuthUser[]>('/users.json').subscribe((users) => {
      const u = users.find(
        (x) => x.username === this.username && (x as any).password === this.password
      );
      if (u) {
        this.auth.login(u);
        this.router.navigateByUrl('/users');
      } else this.error.set(true);
    });
  }

  switchLang(lang: string) {
    this.language.switchLang(lang);
  }
}
