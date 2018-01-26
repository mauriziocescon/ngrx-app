import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { ListActionTypes, FetchBlocksComplete } from "../../actions/list.actions";

import { Block, BlockType, CheckBoxBlock } from "../../models";
import { CheckBoxService } from "../../services";
import { CheckBoxActionTypes, AddBlocks, UpdateBlock } from "../../actions/blocks/check-box.actions";

@Injectable()
export class CheckBoxEffect {

  constructor(protected actions$: Actions,
              protected checkBoxService: CheckBoxService) {
  }

  @Effect() blocksAvailable: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const checkBoxBlocks = blocks.filter((block: Block) => {
        return block.type === BlockType.CheckBox;
      });
      return new AddBlocks({blocks: checkBoxBlocks});
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(CheckBoxActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload: { block: { id: number, changes: CheckBoxBlock }, notify: boolean }) => {
      if (payload.notify) {
        this.checkBoxService.blockDidChange(payload.block);
      }
      return empty();
    });
}