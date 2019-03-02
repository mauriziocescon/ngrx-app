import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { COMPONENTS, UnknownComponent } from './components';
import { CONTAINERS } from './containers';
import { EFFECTS } from './store/effects';
import { TOKEN, reducerProvider } from './store/reducers';
import { SERVICES } from './store/services';

@NgModule({
  imports: [
    SharedModule,

    StoreModule.forFeature('blocks', TOKEN),
    EffectsModule.forFeature([
      ...EFFECTS,
    ]),
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  entryComponents: [
    UnknownComponent,
    ...CONTAINERS,
  ],
  providers: [
    reducerProvider,
    ...SERVICES,
  ],
  exports: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
})
export class BlocksModule {
}
