import { Injectable } from '@angular/core';

import * as parseLinkHeader from 'parse-link-header';

import { AppConstantsService } from './app-constants.service';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {

  constructor(protected appConstants: AppConstantsService) {
  }

  /**
   * Parse link property
   * inside headers
   *
   * @param headers to parse
   */
  parseLinkHeaders(headers: any): any {
    if (headers && headers.get('link') && headers.get('link').length === 0) {
      throw new Error('parseLinkHeaders: link must be defined');
    }

    return parseLinkHeader(headers.get('link'));
  }
}
