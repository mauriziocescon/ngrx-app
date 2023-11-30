import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Block } from '../../shared';

export const actionGroup = createActionGroup({
  source: `detail`,
  events: {
    loadBlocks: props<{ instanceId: string }>(),
    loadBlocksSuccess: props<{ blocks: Block[] }>(),
    loadBlocksFailure: props<{ error: string }>(),

    updateBlock: props<{ block: Update<Block> }>(),

    syncBlocks: props<{ instanceId: string, blocks: Block[] }>(),
    syncBlocksSuccess: emptyProps(),
    syncBlocksFailure: props<{ error: string }>(),

    syncRequired: props<{ timestamp: number }>(),
    synchronized: emptyProps(),

    clearBlocks: emptyProps(),

    startEffects: emptyProps(),
    stopEffects: emptyProps(),
  },
});
