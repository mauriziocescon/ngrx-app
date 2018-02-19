import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { ListActionTypes, FetchBlocksComplete } from "../../../actions/list/list.actions";
import { SyncRequired } from "../../../actions/list/sync.actions";
import { DropdownActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../../actions/list/blocks/dropdown.actions";

import { Block, BlockType } from "../../../models";
import { DropdownActionsService } from "../../../services";

@Injectable()
export class DropdownEffect {

  constructor(protected actions$: Actions,
              protected dropdownService: DropdownActionsService) {
  }

  @Effect() blocksAvailable$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const dropdownBoxBlocks = blocks.filter((block: Block) => {
        return block.type === BlockType.Dropdown;
      });
      return new AddBlocks({blocks: dropdownBoxBlocks});
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(DropdownActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.dropdownService.blockDidChange(payload.block);
      }
      return [new SyncRequired(Date.now())];
    });
}
