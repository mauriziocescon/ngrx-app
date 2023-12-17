import { NgModule, LOCALE_ID } from '@angular/core';
import { StoreModule, provideState } from '@ngrx/store';

import { AppLanguageService } from './services';
import { UI } from './ui';

import { feature } from './store/core.feature';

function createLanguageIdLoader(appLanguage: AppLanguageService): string {
  return appLanguage.getLanguageId();
}

@NgModule({
  imports: [
    // WORKING FINE
    StoreModule.forFeature(feature),

    ...UI,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (createLanguageIdLoader),
      deps: [AppLanguageService],
    },

    // NOT WORKING
    // provideState(feature),
  ],
  exports: [
    ...UI,
  ],
})
export class CoreModule {
}
