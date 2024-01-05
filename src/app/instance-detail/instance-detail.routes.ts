import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { InstanceDetailEffects } from './store/instance-detail.effects';
import { feature } from './store/instance-detail.feature';

import { InstanceDetailContainerComponent } from './ui/instance-detail.container';

export default [
  {
    path: '',
    component: InstanceDetailContainerComponent,
    providers: [
      provideState(feature),
      provideEffects([InstanceDetailEffects]),
    ],
  },
] satisfies Route[];
