import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";

import { NGXLogger } from "ngx-logger";

import { AppConstantsService } from "./core/core.module";

import { BlockHooksService, BlocksHooks } from "./dynamic-block-list/dynamic-block-list.module";

import * as setOfRules from "./custom-rules-integration";

@Injectable()
export class RulesResolve implements Resolve<BlocksHooks> {

  constructor(protected http: HttpClient,
              protected logger: NGXLogger,
              protected appConstants: AppConstantsService,
              protected blockHooks: BlockHooksService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BlocksHooks> | BlocksHooks {
    const module = route.paramMap.get("module");
    const step = route.paramMap.get("step");
    return this.fetchRules(module, step);
  }

  fetchRules(module: string, step: string): Observable<BlocksHooks> {
    const url = this.appConstants.Api.rulesConfig;
    const options = {
      params: {
        module: module,
        step: step,
      },
    };
    return this.http.get<string>(url, options)
      .switchMap((data) => {
        const hooks = setOfRules[module][data];
        this.blockHooks.setupHooks(hooks, module, step);
        return of(hooks);
      })
      .catch((err: HttpErrorResponse) => {
        this.blockHooks.setupHooks(null, module, step);
        return this.handleError(err);
      });
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
