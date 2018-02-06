import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

import { NGXLogger } from "ngx-logger";

import { AppConstantsService } from "./core/core.module";

import { BlockHooksService, BlocksHooks } from "./dynamic-form/dynamic-form.module";

import * as setOfRules from "./custom-rules";

@Injectable()
export class RulesResolve implements Resolve<BlocksHooks> {

  constructor(protected http: HttpClient,
              protected logger: NGXLogger,
              protected appConstants: AppConstantsService,
              protected blockHooks: BlockHooksService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BlocksHooks> {
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
      .map((data) => {
        const hooks = setOfRules[module][data];
        this.blockHooks.setupHooks(hooks, module, step);
        return hooks;
      })
      .catch(err => {
        this.blockHooks.setupHooks({}, module, step);
        return Observable.throw(err.message || "Server error");
      });
  }
}
