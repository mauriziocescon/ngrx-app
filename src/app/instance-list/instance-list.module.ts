import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core';
import { SharedModule } from '../shared';

import { InstanceListRoutingModule } from './instance-list-routing.module';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { EFFECTS } from './store/effects';
import { TOKEN, reducerProvider } from './store/reducers';
import { SERVICES } from './store/services';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,

    StoreModule.forFeature('instanceList', TOKEN),
    EffectsModule.forFeature([
      ...EFFECTS,
    ]),
    InstanceListRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  providers: [
    reducerProvider,
    ...SERVICES,
  ],
})
export class InstanceListModule {
}
