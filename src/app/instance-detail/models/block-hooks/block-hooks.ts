import { CheckBoxBlock } from '../blocks/check-box.model';
import { DropdownBlock } from '../blocks/dropdown-block.model';
import { TextInputBlock } from '../blocks/text-input.model';

import { BlockActions } from '../block-actions/block-actions';

export interface BlockActionList {
  (block: CheckBoxBlock, actions: BlockActions): void;

  (block: DropdownBlock, actions: BlockActions): void;

  (block: TextInputBlock, actions: BlockActions): void;
}

export interface BlockHooks {
  [propName: string]: BlockActionList;
}
