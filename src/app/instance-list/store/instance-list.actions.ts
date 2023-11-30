import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { Instance } from '../models';

export const actionGroup = createActionGroup({
  source: `list`,
  events: {
    loadInstances: props<{ textSearch: string }>(),
    loadInstancesSuccess: props<{ instances: Instance[] }>(),
    loadInstancesFailure: props<{ error: string }>(),

    startEffects: emptyProps(),
    stopEffects: emptyProps(),
  },
});
