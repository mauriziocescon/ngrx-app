import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { SharedModule } from "../shared/shared.module";

import * as languageActions from "./actions/language.actions";
import * as modalAlertsActions from "./actions/modal-alert.actions";
import * as modalConfirmersActions from "./actions/modal-confirmer.actions";

import {
  ModalAlertComponent,
  ModalConfirmerComponent,
  COMPONENTS,
} from "./components";
import {
  NavigationBarContainerComponent,
  CONTAINERS
} from "./containers";

import { AppConstantsService } from "./services/app-constants.service";
import { AppLanguageService } from "./services/app-language.service";
import { LocalStorageService } from "./services/local-storage.service";
import { UIUtilitiesService } from "./services/ui-utilities.service";
import { UtilitiesService } from "./services/utilities.service";

import { JsonServerInterceptor } from "./interceptors/json-server.interceptor";

export function createLanguageIdLoader(appLanguageService: AppLanguageService) {
  return appLanguageService.getLanguageId();
}

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  entryComponents: [
    ModalAlertComponent,
    ModalConfirmerComponent,
  ],
  exports: [
    NavigationBarContainerComponent
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only");
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CurrencyPipe,
        DatePipe,
        DecimalPipe,
        PercentPipe,

        AppConstantsService,
        AppLanguageService,
        LocalStorageService,
        UIUtilitiesService,
        UtilitiesService,
        {
          provide: LOCALE_ID,
          useFactory: (createLanguageIdLoader),
          deps: [AppLanguageService]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JsonServerInterceptor,
          multi: true,
        },
      ]
    };
  }
}

export {
  languageActions,
  modalAlertsActions,
  modalConfirmersActions
};

export { EFFECTS as CORE_EFFECTS} from "./effects";

export * from "./models";

export {
  AppConstantsService,
  AppLanguageService,
  LocalStorageService,
  UIUtilitiesService,
  UtilitiesService,
};
