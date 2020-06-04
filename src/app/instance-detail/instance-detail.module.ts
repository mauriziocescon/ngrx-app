import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { InstanceDetailRoutingModule } from './instance-detail-routing.module';

import { COMPONENTS, UnknownComponent } from './components';
import { CONTAINERS, InstanceDetailContainerComponent } from './containers';
import { EFFECTS } from './store/effects';
import { TOKEN, reducerProvider } from './store/reducers';
import { SERVICES as STORE_SERVICES } from './store/services';
import { SERVICES } from './services';

@NgModule({
  imports: [
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
  entryComponents: [
    UnknownComponent,
    ...CONTAINERS,
  ],
  providers: [
    reducerProvider,
    ...STORE_SERVICES,
    ...SERVICES,
  ],
  exports: [
    InstanceDetailContainerComponent,
  ],
})
export class InstanceDetailModule {
}
