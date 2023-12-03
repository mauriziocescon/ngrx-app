import { NgModule, LOCALE_ID } from '@angular/core';
import { StoreModule, provideState } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { AppLanguageService } from './services';
import { UI } from './ui';

import * as effects from './store/core.effects';
import { feature } from './store/core.feature';

function createLanguageIdLoader(appLanguage: AppLanguageService): string {
  return appLanguage.getLanguageId();
}

@NgModule({
  imports: [
    SharedModule,

    // WORKING FINE
    StoreModule.forFeature(feature),
    EffectsModule.forFeature(effects),

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
    // provideEffects(effects),
  ],
  exports: [
    ...UI,
  ],
})
export class CoreModule {
}
