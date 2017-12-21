import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

import { JsonServerInterceptor } from "./interceptors/json-server.interceptor";

import { AppConstantsService } from "./services/app-constants.service";
import { AppLanguageService } from "./services/app-language.service";
import { LocalStorageService } from "./services/local-storage.service";
import { UtilitiesService } from "./services/utilities.service";

import { reducers } from "./reducers";

export function createLanguageIdLoader(appLanguageService: AppLanguageService) {
  return appLanguageService.getLanguageId();
}

@NgModule({
  imports: [
    CommonModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature("core", reducers),
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
  UtilitiesService,
};
