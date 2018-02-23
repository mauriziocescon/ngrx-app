import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { ListActionTypes, FetchBlocksComplete } from "../../../actions/list/list.actions";
import { SyncRequired } from "../../../actions/list/sync.actions";
import { TextInputActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../../actions/list/blocks/text-input.actions";

import { Block, BlockType } from "../../../models";
import { TextInputActionsService } from "../../../services";

@Injectable()
export class TextInputEffect {

  constructor(protected actions$: Actions,
              protected textInputService: TextInputActionsService) {
  }

  @Effect() blocksAvailable$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const textInputBoxBlocks = blocks
        .filter((block: Block) => {
          return block.type === BlockType.TextInput;
        })
        .map((block: Block) => {
          return { id: block.id, changes: { ...block }};
        });
      return new AddBlocks(textInputBoxBlocks);
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(TextInputActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.textInputService.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });
}
