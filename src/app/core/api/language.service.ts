import { Injectable, signal } from '@angular/core';
import { StorageService } from '@core/storage/storage.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  langs = [
    { code: 'es', label: 'Español', flag: '🇲🇽' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  currentLang = signal<string>('es');

  constructor(private translate: TranslateService, private storage: StorageService) {
    this.initLang();
  }

  initLang() {
    const saved = this.storage.get('lang');
    const initLang = saved || 'es';

    this.translate.use(initLang);
    this.currentLang.set(initLang);

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang.set(event.lang);
      this.storage.set('lang', event.lang);
    });
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
