import { NgModule, LOCALE_ID } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

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
    provideState(coreFeature),
    provideEffects(coreEffects),
  ],
  exports: [
    ...CONTAINERS,
  ],
})
export class CoreModule {
}
