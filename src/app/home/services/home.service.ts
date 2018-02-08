import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }
}
