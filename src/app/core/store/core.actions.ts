import { createActionGroup, props, emptyProps } from '@ngrx/store';

export const actionGroup = createActionGroup({
  source: `core`,
  events: {
    setLanguage: props<{ lang: string }>(),

    clear: emptyProps(),
  },
});
