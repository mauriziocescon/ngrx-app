import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";

import { TranslateService } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";

import { AppConstantsService, ModalAlert, modalAlertsActions } from "../../../core/core.module";

import { BlocksHooks } from "../../models";

import { BlockHooksService } from "./list/hooks.service";

@Injectable()
export class RulesResolve implements Resolve<BlocksHooks> {
  protected alertId: string;

  constructor(protected store$: Store<any>,
              protected http: HttpClient,
              protected router: Router,
              protected translate: TranslateService,
              protected logger: NGXLogger,
              protected appConstants: AppConstantsService,
              protected blockHooks: BlockHooksService) {
    this.alertId = "1";
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
        const hooks = this.blockHooks.getSetOfRules(module, data);
        this.blockHooks.setupHooks(hooks, module, step);
        return of(hooks);
      })
      .catch((err: HttpErrorResponse) => {
        this.translate.get([
          "CONTAINER.INSTANCE_DETAIL.ALERT_BUTTON",
          "CONTAINER.INSTANCE_DETAIL.ALERT_TITLE",
        ])
          .subscribe((translations: any) => {
            const modalAlert: ModalAlert = {
              id: this.alertId,
              title: translations["CONTAINER.INSTANCE_DETAIL.ALERT_TITLE"],
              message: err.message,
              buttonLabel: translations["CONTAINER.INSTANCE_DETAIL.ALERT_BUTTON"],
            };
            this.store$.dispatch(new modalAlertsActions.ShowModalAlert({modal: modalAlert}));
          });
        this.router.navigate(["/instance-list"]);
        return empty();
      });
  }
}
