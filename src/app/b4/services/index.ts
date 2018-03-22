import { B4BlockActionsService } from './block-actions.service';
import { B4BlockHooksService } from './block-hooks.service';
import { B4BlockUtilsService } from './block-utils.service';
import { B4InstanceDetailStoreService } from './instance-detail-store.service';

import { B4DossierActionsService } from './blocks/dossier/dossier-actions.service';

import { B4DossierHooksTriggerService } from './blocks/dossier/dossier-hooks-trigger.service';

import {
  BLOCK_ACTIONS_TOKEN,
  BLOCK_HOOKS_TOKEN,
  BLOCK_UTILS_TOKEN,
  INSTANCE_DETAIL_STORE_TOKEN,
} from '../../instance-detail/instance-detail.module';

export const SERVICES = [
  { provide: BLOCK_ACTIONS_TOKEN, useClass: B4BlockActionsService, multi: true },
  { provide: BLOCK_HOOKS_TOKEN, useClass: B4BlockHooksService, multi: true },
  { provide: BLOCK_UTILS_TOKEN, useClass: B4BlockUtilsService, multi: true },
  { provide: INSTANCE_DETAIL_STORE_TOKEN, useClass: B4InstanceDetailStoreService, multi: true },

  B4DossierActionsService,

  B4DossierHooksTriggerService,
];

export {
  B4DossierHooksTriggerService,
};
