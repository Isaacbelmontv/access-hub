import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '@core/auth/auth.service';
import { AuthUser } from '@core/models';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, CardModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  http = inject(HttpClient);
  auth = inject(AuthService);
  router = inject(Router);
  username = '';
  password = '';
  error = signal(false);

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
}
