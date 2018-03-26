import { Injectable } from '@angular/core';

import * as parseLinkHeader from 'parse-link-header';

import { AppConstantsService } from './app-constants.service';

@Injectable()
export class UtilitiesService {

  constructor(protected appConstants: AppConstantsService) {
  }

  /**
   * Parse link property
   * inside headers
   *
   * @param headers
   */
  parseLinkHeaders(headers: any): any {
    if (headers && headers('link') && headers('link').length === 0) {
      throw new Error('parseLinkHeaders: link must be defined');
    }

    return parseLinkHeader(headers('link'));
  }
}
