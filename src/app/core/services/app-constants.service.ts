import { Injectable } from '@angular/core';

import * as Constants from './app-constants.model';

/**
 * Get application constants
 * saved in app-constants.model
 * grouped by field
 */
@Injectable()
export class AppConstantsService {
  protected api: Constants.Api;
  protected application: Constants.Application;
  protected languages: Constants.Languages;
  protected localStorageKey: Constants.LocalStorageKey;

  constructor() {
    this.api = new Constants.Api();
    this.application = new Constants.Application();
    this.languages = new Constants.Languages();
    this.localStorageKey = new Constants.LocalStorageKey();
  }

  get Api(): Constants.Api {
    return this.api;
  }

  get Application(): Constants.Application {
    return this.application;
  }

  get Languages(): Constants.Languages {
    return this.languages;
  }

  get LocalStorageKey(): Constants.LocalStorageKey {
    return this.localStorageKey;
  }
}
