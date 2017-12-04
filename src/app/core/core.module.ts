import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from "@angular/common";

import { AppConstantsService } from "./services/app-constants.service";
import { AppLanguageService } from "./services/app-language.service";
import { LocalStorageService } from "./services/local-storage.service";
import { UtilitiesService } from "./services/utilities.service";

export function createLanguageIdLoader(appLanguageService: AppLanguageService) {
  return appLanguageService.getLanguageId();
}

@NgModule({
  imports: [
    CommonModule,
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
        }
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
