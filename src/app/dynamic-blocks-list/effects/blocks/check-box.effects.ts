import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
// import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";

import { ListActionTypes, FetchBlocksComplete, UpdateBlocks } from "../../actions/list.actions";

import { Block, BlockType } from "../../models";
import { BlockListService, CheckBoxService } from "../../services";
import { CheckBoxActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../actions/blocks/check-box.actions";

@Injectable()
export class CheckBoxEffect {

  constructor(protected actions$: Actions,
              protected blocksList: BlockListService,
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

  @Effect() clearBlocks: Observable<Action> = this.actions$
    .ofType(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(CheckBoxActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .withLatestFrom(this.helperFunction())
    .switchMap(([payload, blocks]) => {
      if (payload.notify) {
        this.checkBoxService.blockDidChange(payload.block);
      }
      return [new UpdateBlocks(this.payloadFunction(blocks))];
    });

  helperFunction(): any {
    const params = this.blocksList.getUpdateBlocksInstanceSelector();
    return this.blocksList.getAllEditBlocksSelector(params.module, params.instance, params.step);
  }

  payloadFunction(blocks): any {
    return {
      ...this.blocksList.getUpdateBlocksInstanceSelector(),
      blocks: blocks,
    };
  }
}
