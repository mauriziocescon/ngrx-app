import { NgModule } from '@angular/core';
import { StoreModule, provideState } from '@ngrx/store';

import { UI } from './ui';

import { feature } from './store/core.feature';

@NgModule({
  imports: [
    // WORKING FINE
    StoreModule.forFeature(feature),

    ...UI,
  ],
  providers: [
    // NOT WORKING
    // provideState(feature),
  ],
  exports: [
    ...UI,
  ],
})
export class CoreModule {
}
