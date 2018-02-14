import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Observable } from "rxjs/Observable";

import { AppConstantsService } from "../../core/core.module";

import { Instance } from "../models";

@Injectable()
export class HomeService {

  constructor(protected http: HttpClient,
              protected appConstants: AppConstantsService) {
  }

  getInstances(): Observable<Instance[]> {
    return this.http
      .get<Instance[]>(this.appConstants.Api.instances)
      .map(data => data)
      .catch((err: HttpErrorResponse) => this.handleError(err));
  }

  protected handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      return new ErrorObservable(err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      return new ErrorObservable(`Code ${err.status}, body: ${err.message}` || "Server error");
    }
  }
}