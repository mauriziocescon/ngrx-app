import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { InstanceListRoutingModule } from './instance-list-routing.module';

import { EFFECTS } from './store/effects';
import { TOKEN, reducerProvider } from './store/reducers';
import { SERVICES } from './store/services';

import { COMPONENTS } from './components';
import {
  CONTAINERS,
  InstanceListPageComponent,
} from './containers';

@NgModule({
  imports: [
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
  entryComponents: [],
  providers: [
    reducerProvider,
    ...SERVICES,
  ],
})
export class InstanceListModule {
}

export * from './models';

export {
  InstanceListPageComponent,
};
