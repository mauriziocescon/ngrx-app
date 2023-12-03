import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core';
import { SharedModule } from '../shared';

import { InstanceListRoutingModule } from './instance-list-routing.module';

import { InstanceListEffects } from './store/instance-list.effects';
import { feature } from './store/instance-list.feature';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,

    StoreModule.forFeature(feature),
    EffectsModule.forFeature([InstanceListEffects]),
    InstanceListRoutingModule,
  ],
})
export class InstanceListModule {
}
