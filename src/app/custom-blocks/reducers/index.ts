import { createSelector } from "@ngrx/store";

import { Block, fromDynamicForm } from "../../dynamic-form/dynamic-form.module";

import { fromB1 } from "../../b1";

import { fromB2 } from "../../b2";

// -----------------
// --------- generic
export const getAllEditBlocksState = createSelector(
  fromDynamicForm.getAllEditBlocksState,
  fromB1.getAllEditBlocksState,
  fromB2.getAllEditBlocksState,
  (blocks: Block[], b1Blocks: Block[], b2Blocks: Block[]) => {
    return [
      ...blocks,
      ...b1Blocks,
      ...b2Blocks,
    ];
  },
);

export const getAllEditBlocksValidityState = createSelector(
  fromDynamicForm.getAllEditBlocksValidityState,
  fromB1.getAllEditBlocksValidityState,
  fromB2.getAllEditBlocksValidityState,
  (blocskValidity: boolean, b1BlocksValidity: boolean, b2BlocksValidity: boolean) => {
    return blocskValidity && b1BlocksValidity && b2BlocksValidity;
  }
);
