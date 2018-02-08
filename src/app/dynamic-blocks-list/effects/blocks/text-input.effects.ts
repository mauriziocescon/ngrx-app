import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import { ListActionTypes, FetchBlocksComplete } from "../../actions/list.actions";
import { RequireSynch } from "../../actions/synch.actions";
import { TextInputActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../actions/blocks/text-input.actions";

import { Block, BlockType } from "../../models";
import { TextInputService } from "../../services";

@Injectable()
export class TextInputEffect {

  constructor(protected actions$: Actions,
              protected textInputService: TextInputService) {
  }

  @Effect() blocksAvailable$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const textInputBoxBlocks = blocks.filter((block: Block) => {
        return block.type === BlockType.TextInput;
      });
      return new AddBlocks({blocks: textInputBoxBlocks});
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
      return [new RequireSynch()];
    });
}
