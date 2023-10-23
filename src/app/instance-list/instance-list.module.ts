import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core';
import { SharedModule } from '../shared';

import { InstanceListRoutingModule } from './instance-list-routing.module';

import { EFFECTS } from './store/effects';
import { TOKEN, reducerProvider } from './store/reducers';
import { SERVICES } from './store/services';

import { COMPONENTS } from './components';
import {
  CONTAINERS,
  InstanceListContainerComponent,
} from './containers';

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

export * from './models';

export {
  InstanceListContainerComponent,
};
