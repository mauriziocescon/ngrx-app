import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/switchMap";

import { TranslateService } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";

import { AppConstantsService, ModalAlert, modalAlertsActions } from "../../../core/core.module";

import { InstanceParamsService } from "./instance-params.service";
import { BlockHooksIntegrationService } from "../integration";

@Injectable()
export class RulesResolve implements Resolve<string> {
  protected alertId: string;

  constructor(protected store$: Store<any>,
              protected http: HttpClient,
              protected router: Router,
              protected translate: TranslateService,
              protected logger: NGXLogger,
              protected appConstants: AppConstantsService,
              protected instanceParams: InstanceParamsService,
              protected blockHooks: BlockHooksIntegrationService) {
    this.alertId = "1";
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | string {
    const module = route.paramMap.get("module");
    const instance = route.paramMap.get("instance");
    const step = route.paramMap.get("step");
    const params = {
      module: module,
      instance: instance,
      step: step,
    };
    this.instanceParams.setInstanceParams(params);

    return this.fetchRulesConfig(module, step);
  }

  fetchRulesConfig(module: string, step: string): Observable<string> {
    const url = this.appConstants.Api.rulesConfig;
    const options = {
      params: {
        module: module,
        step: step,
      },
    };
    return this.http.get<string>(url, options)
      .switchMap((config) => {
        this.blockHooks.setConfig(config);
        return config;
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
        return "";
      });
  }
}
