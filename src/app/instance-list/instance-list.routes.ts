import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { InstanceListEffects } from './store/instance-list.effects';
import { feature } from './store/instance-list.feature';

import { InstanceListContainerComponent } from './ui/instance-list.container';

export default [
  {
    path: '',
    component: InstanceListContainerComponent,
    providers: [
      provideState(feature),
      provideEffects([InstanceListEffects]),
    ],
  },
] satisfies Route[];
