import { NgModule, LOCALE_ID } from '@angular/core';
import { StoreModule, provideState } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { AppLanguageService } from './services';

import * as coreEffects from './store/core.effects';
import { coreFeature } from './store/core.reducer';

function createLanguageIdLoader(appLanguage: AppLanguageService): string {
  return appLanguage.getLanguageId();
}

@NgModule({
  imports: [
    SharedModule,

    // WORKING FINE
    StoreModule.forFeature(coreFeature),
    EffectsModule.forFeature(coreEffects),
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (createLanguageIdLoader),
      deps: [AppLanguageService],
    },

    // NOT WORKING
    // provideState(coreFeature),
    // provideEffects(coreEffects),
  ],
  exports: [
    ...CONTAINERS,
  ],
})
export class CoreModule {
}
