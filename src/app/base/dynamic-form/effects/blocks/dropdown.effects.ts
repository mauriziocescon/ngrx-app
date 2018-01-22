import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import { ListActionTypes, FetchBlocksComplete } from "../../actions/list.actions";

import { Block, BlockType, DropdownBlock } from "../../models";
import { DropdownService } from "../../services";
import { DropdownActionTypes, AddBlocks, UpdateBlock } from "../../actions/blocks/dropdown.actions";

@Injectable()
export class DropdownEffect {

  constructor(protected actions$: Actions,
              protected dropdownService: DropdownService) {
  }

  @Effect() blocksAvailable: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const dropdownBoxBlocks = blocks.filter((block: Block) => {
        return block.type === BlockType.Dropdown;
      });
      return new AddBlocks({blocks: dropdownBoxBlocks});
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(DropdownActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload: { block: { id: number, changes: DropdownBlock }, notify: boolean }) => {
      if (payload.notify) {
        this.dropdownService.blockDidChange(payload.block);
      }
      return empty();
    });
}
