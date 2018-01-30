import { CheckBoxConfirmerBlock } from "../blocks/check-box-confirmer.model";

import { B1BlocksMethods } from "../block-methods/block-methods";

export interface B1BlocksFunctions {
  (block: CheckBoxConfirmerBlock, methods: B1BlocksMethods): void;
}

export interface B1BlocksHooks {
  [propName: string]: B1BlocksFunctions;
}
