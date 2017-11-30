import { Injectable } from "@angular/core";

import { AppConstantsService } from "./app-constants.service";

@Injectable()
export class UtilitiesService {
  protected appConstants: AppConstantsService;

  constructor(appConstants: AppConstantsService) {
    this.appConstants = appConstants;
  }
}
