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

import { environment } from "../environments/environment";

import * as $ from "jquery";

@Injectable()
export class RulesResolve implements Resolve<BlocksHooks> {

  constructor(protected http: HttpClient,
              protected logger: NGXLogger,
              protected appConstants: AppConstantsService,
              protected blockHooks: BlockHooksService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | BlocksHooks {
    return this.fetchRules();
  }

  fetchRules(): Observable<any> | BlocksHooks {
    if (environment.evaluateScriptsFromServer) {
      return this.getRulesFromScript();
    } else {
      this.getRules()
        .subscribe((hooks: BlocksHooks) => {
          return this.blockHooks.hooks = hooks;
        }, (error: any) => {
          return {};
        });
    }
  }

  getRules(param?: boolean): Observable<any> {
    const url = this.appConstants.Api.rulesConfig;
    const options = {
      params: {type: "1"},
    };

    return this.http.get<string>(url, options)
      .map(data => setOfRules[data])
      .catch(err => {
        return Observable.throw(err.message || "Server error");
      });
  }

  getRulesFromScript(): Observable<any> {
    return Observable.fromPromise(
      $.getScript(environment.rulesUrl + "rules1.js")
        .done(() => {
          this.logger.log(`Rules downloaded from ${environment.rulesUrl}rules.js`);
        })
        .fail((jqxhr, settings, exception) => {
          this.logger.log(`Error downloading rules`);
        }));
  }
}
