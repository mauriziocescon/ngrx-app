import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

import { AppConstantsService } from '../../core';

import { Instance } from '../models';

@Injectable({
  providedIn: 'root',
})
export class InstanceListService {
  private http = inject(HttpClient);
  private appConstants = inject(AppConstantsService);

  getInstances(textSearch: string): Observable<Instance[]> {
    const params = { textSearch: textSearch || '' };

    return this.http.get<Instance[]>(this.appConstants.Api.instances, { params })
      .pipe(
        map(data => data),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    if (err.status === 0) {
      // A client-side or network error occurred
      return throwError(() => err.error);
    } else {
      // The backend returned an unsuccessful response code.
      return throwError(() => `Code ${err.status}, body: ${err.message}` || 'Server error');
    }
  }
}
