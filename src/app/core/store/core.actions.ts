import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { ModalAlert, ModalConfirmer } from '../models';

export const actionGroup = createActionGroup({
  source: `ngrxApp_core`,
  events: {
    setLanguage: props<{ lang: string }>(),

    showModalAlert: props<{ modal: ModalAlert }>(),
    dismissModalAlert: props<{ id: string }>(),

    showModalConfirmer: props<{ modal: ModalConfirmer }>(),
    dismissModalConfirmerWithPositiveResult: props<{ id: string }>(),
    dismissModalConfirmerWithNegativeResult: props<{ id: string }>(),
    dismissModalConfirmer: props<{ id: string }>(),
    cleanModalConfirmer: props<{ id: string }>(),

    clear: emptyProps(),
  },
});
