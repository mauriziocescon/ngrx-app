import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { ModalAlertComponent } from "./components/modal-alert/modal-alert.component";
import { ModalConfirmerComponent } from "./components/modal-confirmer/modal-confirmer.component";

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
    CommonModule,
  ],
  declarations: [
    ModalAlertComponent,
    ModalConfirmerComponent,
  ],
  entryComponents: [
    ModalAlertComponent,
    ModalConfirmerComponent,
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only");
    }
  }

  public static forRoot(): ModuleWithProviders {
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
  AppConstantsService,
  AppLanguageService,
  LocalStorageService,
  UIUtilitiesService,
  UtilitiesService,
};
