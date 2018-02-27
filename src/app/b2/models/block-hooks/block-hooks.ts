import { BlockActionList, BlockHooks } from "../../../instance-detail/instance-detail.module";

import { DatePickerBlock } from "../blocks/date-picker.model";

import { B2BlockActions } from "../block-actions/block-actions";

export interface B2BlockActionList extends BlockActionList {
  (block: DatePickerBlock, actions: B2BlockActions): void;
}

export interface B2BlocksHooks extends BlockHooks {
  [propName: string]: B2BlockActionList;
}
