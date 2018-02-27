import { BlockActionList, BlockHooks } from "../../../instance-detail/instance-detail.module";

import { CheckBoxConfirmerBlock } from "../blocks/check-box-confirmer.model";

import { B1BlockActions } from "../block-actions/block-actions";

export interface B1BlockActionList extends BlockActionList {
  (block: CheckBoxConfirmerBlock, actions: B1BlockActions): void;
}

export interface B1BlockHooks extends BlockHooks {
  [propName: string]: B1BlockActionList;
}
