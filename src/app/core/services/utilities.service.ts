import { Injectable } from '@angular/core';

import parseLinkHeader from 'parse-link-header';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  /**
   * Parse link property
   * inside headers
   *
   * @param headers http header to parse
   */
  parseLinkHeaders(headers: any): any {
    if (headers && headers.get('link') && headers.get('link').length === 0) {
      throw new Error('parseLinkHeaders: link must be defined');
    }

    return parseLinkHeader(headers.get('link'));
  }
}
