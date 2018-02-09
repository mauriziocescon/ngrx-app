import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import { ListActionTypes, FetchBlocksComplete } from "../../actions/list.actions";
import { SyncRequired } from "../../actions/sync.actions";
import { CheckBoxActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../actions/blocks/check-box.actions";

import { Block, BlockType } from "../../models";
import { CheckBoxService } from "../../services";

@Injectable()
export class CheckBoxEffect {

  constructor(protected actions$: Actions,
              protected checkBoxService: CheckBoxService) {
  }

  @Effect() blocksAvailable$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const checkBoxBlocks = blocks.filter((block: Block) => {
        return block.type === BlockType.CheckBox;
      });
      return new AddBlocks({blocks: checkBoxBlocks});
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(CheckBoxActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.checkBoxService.blockDidChange(payload.block);
      }
      return [new SyncRequired()];
    });
}
