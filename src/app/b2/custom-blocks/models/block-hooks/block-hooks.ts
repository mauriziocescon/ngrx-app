import { DatePickerBlock } from "../blocks/date-picker.model";

import { B2BlocksMethods } from "../block-methods/block-methods";

export interface B2BlocksFunctions {
  (block: DatePickerBlock, methods: B2BlocksMethods): void;
}

export interface B2BlocksHooks {
  [propName: string]: B2BlocksFunctions;
}
