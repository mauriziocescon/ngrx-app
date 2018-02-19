import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import {
  Block,
  FetchBlocksComplete,
  ListActionTypes,
  SyncRequired,
} from "../../../../instance-detail/instance-detail.module";

import { CheckBoxConfirmerActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../actions/blocks/check-box-confirmer.actions";

import { B1BlockType } from "../../models";
import { CheckBoxConfirmerActionsService } from "../../services";

@Injectable()
export class CheckBoxConfirmerEffects {

  constructor(protected actions$: Actions,
              protected checkBoxConfirmerService: CheckBoxConfirmerActionsService) {
  }

  @Effect() blocksAvailable$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const checkBoxConfirmerBoxBlocks = blocks.filter((block: Block) => {
        return block.type === B1BlockType.CheckBoxConfirmer;
      });
      return new AddBlocks({blocks: checkBoxConfirmerBoxBlocks});
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(CheckBoxConfirmerActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.checkBoxConfirmerService.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });
}
