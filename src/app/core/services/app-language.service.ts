import { Injectable } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { AppConstantsService } from "./app-constants.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable()
export class AppLanguageService {
  protected translate: TranslateService;
  protected appConstants: AppConstantsService;
  protected localStorage: LocalStorageService;
  protected selectedLanguageId: string;

  constructor(translate: TranslateService,
              appConstantsService: AppConstantsService,
              localStorageService: LocalStorageService) {
    this.translate = translate;
    this.appConstants = appConstantsService;
    this.localStorage = localStorageService;

    this.start();

    this.translate.setDefaultLang(this.appConstants.Languages.DEFAULT_LANGUAGE);
    this.translate.use(this.getLanguageId());
  }

  public start(): void {
    const localStorageLang = this.localStorage.getData<string>(this.appConstants.LocalStorageKey.LANGUAGE_ID);
    const browserLang = this.getBrowserLang();
    const defaultLang = this.getDefaultLanguageId();

    if (localStorageLang && this.appConstants.Languages.SUPPORTED_LANG.indexOf(localStorageLang) !== -1) {
      this.selectedLanguageId = localStorageLang;
    } else {
      this.selectedLanguageId = this.appConstants.Languages.SUPPORTED_LANG.indexOf(browserLang) === -1 ? defaultLang : browserLang;
      this.localStorage.setData(this.appConstants.LocalStorageKey.LANGUAGE_ID, this.selectedLanguageId);
    }
  }

  public getLanguageId(): string {
    return this.selectedLanguageId;
  }

  public setLanguageId(languageId: string): void {
    if (languageId !== undefined &&
      languageId !== this.selectedLanguageId &&
      this.appConstants.Languages.SUPPORTED_LANG.indexOf(languageId) !== -1) {

      this.selectedLanguageId = languageId;
      this.localStorage.setData(this.appConstants.LocalStorageKey.LANGUAGE_ID, this.selectedLanguageId);
      this.translate.use(languageId);
      location.reload(true);
    }
  }

  public getSupportedLanguagesList(): string[] {
    return this.appConstants.Languages.SUPPORTED_LANG;
  }

  public getDefaultLanguageId(): string {
    return this.appConstants.Languages.SUPPORTED_LANG[0];
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
}
