import { inject, Injectable } from '@angular/core';

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

  getData<T>(key: string): T | undefined {
    try {
      const result = localStorage.getItem(`${this.prefix}_${key}`);
      return result !== null ? JSON.parse(result) : undefined;
    } catch (e) {
      console.warn(e.toString());
      return undefined;
    }
  }

  setData(key: string, data: any): void {
    try {
      if (data === undefined) {
        localStorage.removeItem(`${this.prefix}_${key}`);
      } else {
        const result = JSON.stringify(data);
        localStorage.setItem(this.prefix + '_' + key, result);
      }
    } catch (e) {
      console.warn(e.toString());
    }
  }

  removeData(key: string): void {
    try {
      localStorage.removeItem(this.prefix + '_' + key.toString());
    } catch (e) {
      console.warn(e.toString());
    }
  }

  removeAllData(): void {
    try {
      for (const key in localStorage) {
        if (key.startsWith(`${this.prefix}_`)) {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      console.warn(e.toString());
    }
  }
}
