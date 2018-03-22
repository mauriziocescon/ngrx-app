import { Injectable } from '@angular/core';

import { AppConstantsService } from './app-constants.service';

@Injectable()
export class UtilitiesService {

  constructor(protected appConstants: AppConstantsService) {
  }
}
