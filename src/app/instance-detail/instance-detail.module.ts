import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CoreModule } from '../core';

import { InstanceDetailRoutingModule } from './instance-detail-routing.module';

import { InstanceDetailEffects } from './store/instance-detail.effects';
import { feature } from './store/instance-detail.feature';

@NgModule({
  imports: [
    CoreModule,

    StoreModule.forFeature(feature),
    EffectsModule.forFeature([InstanceDetailEffects]),
    InstanceDetailRoutingModule,
  ],
})
export class InstanceDetailModule {
}
