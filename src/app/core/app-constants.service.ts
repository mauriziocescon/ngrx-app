import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

export class Api {
  instances = `${environment.apiUrl}instances`;
  blocks = `${environment.apiUrl}blocks`;
}

export class Application {
  APP_NAME = 'ngrx-app';
  SHOW_JSON_SERVER_API = !environment.production;
  JSON_SERVER_API_URL = environment.apiUrl;
}

export class Languages {
  DE = 'de';
  EN = 'en';
  IT = 'it';
  SUPPORTED_LANG = ['de', 'en', 'it'];
  SUPPORTED_LANG_DESC = ['Deutsch', 'English', 'Italiano'];
  DEFAULT_LANGUAGE = 'en';
}

export class LocalStorageKey {
  LANGUAGE_ID = 'LANGUAGE_ID';
}

/**
 * Get application constants
 * grouped by field
 */
@Injectable({
  providedIn: 'root',
})
export class AppConstantsService {
  private api: Api;
  private application: Application;
  private languages: Languages;
  private localStorageKey: LocalStorageKey;

  constructor() {
    this.api = new Api();
    this.application = new Application();
    this.languages = new Languages();
    this.localStorageKey = new LocalStorageKey();
  }

  get Api(): Api {
    return this.api;
  }

  get Application(): Application {
    return this.application;
  }

  get Languages(): Languages {
    return this.languages;
  }

  get LocalStorageKey(): LocalStorageKey {
    return this.localStorageKey;
  }
}
