import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { FetchBlocksComplete, ListActionTypes } from "../../../../base/dynamic-form/actions/list.actions";

import { Block } from "../../../../base/dynamic-form/dynamic-form.module";
import { CheckBoxConfirmerBlock, CustomBlockType } from "../../models";
import { CheckBoxConfirmerService } from "../../services";
import { CheckBoxConfirmerActionTypes, AddBlocks, UpdateBlock } from "../../actions/blocks/check-box-confirmer.actions";

@Injectable()
export class CheckBoxConfirmerEffects {

  constructor(protected actions$: Actions,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
  }

  @Effect() blocksAvailable: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const checkBoxConfirmerBoxBlocks = blocks.filter((block: Block) => {
        return block.type === CustomBlockType.CheckBoxConfirmer;
      });
      return new AddBlocks({blocks: checkBoxConfirmerBoxBlocks});
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(CheckBoxConfirmerActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload: { block: { id: number, changes: CheckBoxConfirmerBlock }, notify: boolean }) => {
      if (payload.notify) {
        this.checkBoxConfirmerService.blockDidChange(payload.block);
      }
      return empty();
    });
}
