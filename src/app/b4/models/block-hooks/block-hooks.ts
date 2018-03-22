import { BlockActionList, BlockHooks } from '../../../instance-detail/instance-detail.module';

import { DossierBlock } from '../blocks/dossier.model';

import { B4BlockActions } from '../block-actions/block-actions';

export interface B4BlockActionList extends BlockActionList {
  (block: DossierBlock, actions: B4BlockActions): void;
}

export interface B4BlockHooks extends BlockHooks {
  [propName: string]: B4BlockActionList;
}
