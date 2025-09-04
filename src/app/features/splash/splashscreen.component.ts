import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-splashscreen',
  imports: [ProgressSpinnerModule, CardModule],
  templateUrl: './splashscreen.component.html',
  styleUrl: './splashscreen.component.css',
})
export class SplashscreenComponent {}
