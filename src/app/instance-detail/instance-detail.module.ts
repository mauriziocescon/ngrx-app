import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core';
import { SharedModule } from '../shared';

import { InstanceDetailRoutingModule } from './instance-detail-routing.module';

import { COMPONENTS } from './components';
import { CONTAINERS } from './containers';
import { EFFECTS } from './store/effects';
import { TOKEN, reducerProvider } from './store/reducers';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,

    StoreModule.forFeature('instanceDetail', TOKEN),
    EffectsModule.forFeature([
      ...EFFECTS,
    ]),
    InstanceDetailRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...CONTAINERS,
  ],
  providers: [
    reducerProvider,
  ],
})
export class InstanceDetailModule {
}
