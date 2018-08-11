import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {
  catchError,
  map,
} from 'rxjs/operators';

import { AppConstantsService } from '../../core/core.module';

import { Block } from '../../shared/shared.module';

@Injectable()
export class BlockListService {

  constructor(protected http: HttpClient,
              protected appConstants: AppConstantsService) {
  }

  getBlocks(instance: string): Observable<Block[]> {
    const options = {
      params: {
        instance: instance,
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

  syncBlocks(instance: string, blocks: Block[]): Observable<Block[]> {
    const body = {
      instance: instance,
      blocks: blocks,
    };

    return this.http
      .post<Block[]>(this.appConstants.Api.blocks, body)
      .pipe(
        map(data => data.sort((a: Block, b: Block) => {
          return a.order - b.order;
        })),
        catchError((err: HttpErrorResponse) => this.handleError(err)),
      );
  }

  protected handleError(err: HttpErrorResponse): Observable<never> {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      return throwError(err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      return throwError(`Code ${err.status}, body: ${err.message}` || 'Server error');
    }
  }
}
