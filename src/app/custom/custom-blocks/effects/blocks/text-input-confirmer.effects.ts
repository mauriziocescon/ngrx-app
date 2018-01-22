import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { FetchBlocksComplete, ListActionTypes } from "../../../../base/dynamic-form/actions/list.actions";

import { Block } from "../../../../base/dynamic-form/dynamic-form.module";
import { TextInputConfirmerBlock, CustomBlockType } from "../../models";
import { TextInputConfirmerService } from "../../services";
import { TextInputConfirmerActionTypes, AddBlocks, UpdateBlock } from "../../actions/blocks/text-input-confirmer.actions";

@Injectable()
export class TextInputConfirmerEffect {

  constructor(protected actions$: Actions,
              protected textInputConfirmerService: TextInputConfirmerService) {
  }

  @Effect() blocksAvailable: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const textInputBoxBlocks = blocks.filter((block: Block) => {
        return block.type === CustomBlockType.TextInputConfirmer;
      });
      return new AddBlocks({blocks: textInputBoxBlocks});
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(TextInputConfirmerActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload: { block: { id: number, changes: TextInputConfirmerBlock }, notify: boolean }) => {
      if (payload.notify) {
        this.textInputConfirmerService.blockDidChange(payload.block);
      }
      return empty();
    });
}
