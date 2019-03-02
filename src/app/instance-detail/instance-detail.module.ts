import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { BlocksModule } from '../blocks/blocks.module';

import { InstanceDetailRoutingModule } from './instance-detail-routing.module';

import { COMPONENTS } from './components';
import { CONTAINERS, InstanceDetailPageComponent } from './containers';
import { EFFECTS } from './store/effects';
import { TOKEN, reducerProvider } from './store/reducers';
import { SERVICES } from './services';

@NgModule({
  imports: [
    SharedModule,
    BlocksModule,

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
  ],
  providers: [
    reducerProvider,
    ...SERVICES,
  ],
  exports: [
    InstanceDetailPageComponent,
  ],
})
export class InstanceDetailModule {
}
