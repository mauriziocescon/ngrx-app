import { Injectable } from "@angular/core";

import { Enum } from "../../shared/shared.module";

import { AppConstantsService } from "./app-constants.service";

/**
 * Manage data in
 * local storage for the
 * application
 */
@Injectable()
export class LocalStorageService {
  protected appConstants: AppConstantsService;

  protected prefix: string;

  constructor(appConstantsService: AppConstantsService) {
    this.appConstants = appConstantsService;

    this.prefix = this.appConstants.Application.APP_NAME;
  }

  public getData<T>(key: Enum): T | undefined {
    try {
      const result = localStorage.getItem(this.prefix + "_" + key.toString());
      return result !== null ? JSON.parse(result) : undefined;
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }

  public setData(key: Enum, data: any): void {
    try {
      if (data === undefined) {
        localStorage.removeItem(this.prefix + "_" + key.toString());
      } else {
        const result = JSON.stringify(data);
        localStorage.setItem(this.prefix + "_" + key.toString(), result);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  public removeData(key: Enum): void {
    try {
      localStorage.removeItem(this.prefix + "_" + key.toString());
    } catch (e) {
      console.warn(e);
    }
  }

  public removeAllData(): void {
    try {
      for (const key in localStorage) {
        if (key.startsWith(this.prefix + "_")) {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }
}
