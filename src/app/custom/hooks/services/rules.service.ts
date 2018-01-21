import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise";

import { environment } from "../../../../environments/environment";

import * as $ from "jquery";

@Injectable()
export class BlockRulesService {

  constructor() {
  }

  getRules(): Observable<any> {
    return Observable.fromPromise(
      // @ts-ignore
      import("../../rules/rules")
    );
  }

  getRulesFromScript(): Observable<any> {
    return Observable.fromPromise(
      $.getScript(environment.rulesUrl + "rules.js")
        .done(() => {
          console.log(`Rules downloaded from ${environment.rulesUrl}rules.js`);
        })
        .fail((jqxhr, settings, exception) => {
          console.log(`Error downloading rules`);
        }));
  }
}
