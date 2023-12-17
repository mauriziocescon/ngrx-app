import { inject, Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeIt from '@angular/common/locales/it';
import { Store } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';

import { AppConstantsService } from './app-constants.service';
import { LocalStorageService } from './local-storage.service';

import { actionGroup } from '../store/core.actions';

@Injectable({
  providedIn: 'root',
})
export class AppLanguageService {
  private selectedLanguageId: string;

  private store$ = inject(Store);
  private translate = inject(TranslateService);
  private appConstants = inject(AppConstantsService);
  private localStorage = inject(LocalStorageService);

  constructor() {
    this.start();

    this.translate.setDefaultLang(this.appConstants.Languages.DEFAULT_LANGUAGE);
    this.translate.use(this.getLanguageId());
  }

  start(): void {
    const localStorageLang = this.localStorage.getData<string>(this.appConstants.LocalStorageKey.LANGUAGE_ID);
    const browserLang = this.getBrowserLang();
    const defaultLang = this.getDefaultLanguageId();

    if (localStorageLang && this.appConstants.Languages.SUPPORTED_LANG.indexOf(localStorageLang) !== -1) {
      this.selectedLanguageId = localStorageLang;
      this.registerLocale();
      this.store$.dispatch(actionGroup.setLanguage({ lang: this.selectedLanguageId }));
    } else {
      this.selectedLanguageId = this.appConstants.Languages.SUPPORTED_LANG.indexOf(browserLang) === -1 ? defaultLang : browserLang;
      this.registerLocale();
      this.localStorage.setData(this.appConstants.LocalStorageKey.LANGUAGE_ID, this.selectedLanguageId);
      this.store$.dispatch(actionGroup.setLanguage({ lang: this.selectedLanguageId }));
    }
  }

  getLanguageId(): string {
    return this.selectedLanguageId;
  }

  setLanguageId(languageId: string): void {
    if (languageId !== undefined &&
      languageId !== this.selectedLanguageId &&
      this.appConstants.Languages.SUPPORTED_LANG.indexOf(languageId) !== -1) {

      this.selectedLanguageId = languageId;
      this.localStorage.setData(this.appConstants.LocalStorageKey.LANGUAGE_ID, this.selectedLanguageId);
      this.registerLocale();
      this.store$.dispatch(actionGroup.setLanguage({ lang: this.selectedLanguageId }));
      this.translate.use(languageId);
      location.reload();
    }
  }

  getSupportedLanguagesList(): string[] {
    return this.appConstants.Languages.SUPPORTED_LANG;
  }

  getDefaultLanguageId(): string {
    return this.appConstants.Languages.DEFAULT_LANGUAGE;
  }

  protected getBrowserLang(): string {
    let lang: string = navigator.language;

    if (lang.length > 0) {
      lang = lang.toLowerCase();
    }

    if (lang.length > 2) {
      lang = lang.substring(0, 2);
    }

    return lang;
  }

  protected registerLocale(): void {
    switch (this.selectedLanguageId) {
      case this.appConstants.Languages.DE: {
        registerLocaleData(localeDe);
        break;
      }
      case this.appConstants.Languages.IT: {
        registerLocaleData(localeIt);
        break;
      }
      default: {
        registerLocaleData(localeEn);
      }
    }
  }
}
