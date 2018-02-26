import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { ListActionTypes, FetchBlocksComplete } from "../../../actions/list/list.actions";
import { SyncRequired } from "../../../actions/list/sync.actions";
import { CheckBoxActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../../actions/list/blocks/check-box.actions";

import { Block, BlockType } from "../../../models";
import { CheckBoxActionsService } from "../../../services";

@Injectable()
export class CheckBoxEffect {

  constructor(protected actions$: Actions,
              protected checkBoxService: CheckBoxActionsService) {
  }

  @Effect() blocksAvailable$: Observable<Action> = this.actions$
    .ofType<FetchBlocksComplete>(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map(action => action.payload)
    .map((blocks: Block[]) => {
      const checkBoxBlocks = blocks
        .filter((block: Block) => {
          return block.type === BlockType.CheckBox;
        })
        .map((block: Block) => {
          return { id: block.id, changes: { ...block }};
        });
      return new AddBlocks(checkBoxBlocks);
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType<ClearBlocks>(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType<UpdateBlock>(CheckBoxActionTypes.UPDATE_BLOCK)
    .map(action => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.checkBoxService.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });
}
