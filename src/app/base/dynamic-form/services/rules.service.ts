import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";

import { NGXLogger } from "ngx-logger";

import { environment } from "../../../../environments/environment";

import * as $ from "jquery";

@Injectable()
export class BlockRulesService {

  constructor(protected logger: NGXLogger) {
  }

  getRules(): Observable<any> {
    return Observable.fromPromise(
      // @ts-ignore
      import("../../../custom/rules/rules1")
    );
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
