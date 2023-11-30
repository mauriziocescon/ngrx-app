import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

import { AppConstantsService } from '../../core';

import { Block } from '../../shared';

@Injectable({
  providedIn: 'root',
})
export class InstanceDetailService {
  protected http = inject(HttpClient);
  protected appConstants = inject(AppConstantsService);

  getBlocks(instanceId: string): Observable<Block[]> {
    const options = {
      params: {
        instanceId,
      },
    };

    return this.http
      .get<Block[]>(this.appConstants.Api.blocks, options)
      .pipe(
        map(data => data.sort((a: Block, b: Block) => {
          return a.order - b.order;
        })),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  syncBlocks(instanceId: string, blocks: Block[]): Observable<Block[]> {
    const body = {
      instanceId,
      blocks,
    };

    return this.http
      .put<Block[]>(this.appConstants.Api.blocks, body)
      .pipe(
        map(data => data.sort((a: Block, b: Block) => {
          return a.order - b.order;
        })),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  protected handleError(err: HttpErrorResponse): Observable<never> {
    if (err.status === 0) {
      // A client-side or network error occurred
      return throwError(() => err.error);
    } else {
      // The backend returned an unsuccessful response code.
      return throwError(() => `Code ${err.status}, body: ${err.message}` || 'Server error');
    }
  }
}
