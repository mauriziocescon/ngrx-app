import { NgModule, Optional, SkipSelf, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppConstantsService } from "./services/app-constants.service";
import { AppLanguageService } from "./services/app-language.service";
import { LocalStorageService } from "./services/local-storage.service";
import { UtilitiesService } from "./services/utilities.service";

export function createLanguageIdLoader(appLanguageService: AppLanguageService) {
  return appLanguageService.getLanguageId();
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: []
})
export class CoreModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
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

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only");
    }
  }
}

export {
  AppConstantsService,
  AppLanguageService,
  LocalStorageService,
  UtilitiesService
};
