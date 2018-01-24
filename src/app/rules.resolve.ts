import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs/Observable";

import { BlockHooksService, BlocksHooks } from "./base/dynamic-form/dynamic-form.module";

@Injectable()
export class RulesResolve implements Resolve<BlocksHooks> {

  constructor(private blockHooks: BlockHooksService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | BlocksHooks {
    return this.blockHooks.fetchRules();
  }
}
