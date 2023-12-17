import { inject, Injectable } from '@angular/core';

import { Enum } from '../../shared';

import { AppConstantsService } from './app-constants.service';

/**
 * Manage data in
 * local storage for the
 * application
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private prefix: string;
  private appConstants = inject(AppConstantsService);

  constructor() {
    this.prefix = this.appConstants.Application.APP_NAME;
  }

  getData<T>(key: Enum): T | undefined {
    try {
      const result = localStorage.getItem(this.prefix + '_' + key.toString());
      return result !== null ? JSON.parse(result) : undefined;
    } catch (e) {
      // this.logger.warn(e.toString());
      return undefined;
    }
  }

  setData(key: Enum, data: any): void {
    try {
      if (data === undefined) {
        localStorage.removeItem(this.prefix + '_' + key.toString());
      } else {
        const result = JSON.stringify(data);
        localStorage.setItem(this.prefix + '_' + key.toString(), result);
      }
    } catch (e) {
      // this.logger.warn(e.toString());
    }
  }

  removeData(key: Enum): void {
    try {
      localStorage.removeItem(this.prefix + '_' + key.toString());
    } catch (e) {
      // this.logger.warn(e.toString());
    }
  }

  removeAllData(): void {
    try {
      for (const key in localStorage) {
        if (key.startsWith(this.prefix + '_')) {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      // this.logger.warn(e.toString());
    }
  }
}
