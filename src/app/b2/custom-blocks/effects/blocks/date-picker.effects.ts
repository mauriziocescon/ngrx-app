import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

import {
  Block,
  FetchBlocksComplete,
  ListActionTypes,
} from "../../../../dynamic-blocks-list/dynamic-blocks-list.module";

import { B2BlockType } from "../../models";
import { DatePickerService } from "../../services";
import { DatePickerActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../actions/blocks/date-picker.actions";

@Injectable()
export class DatePickerEffects {

  constructor(protected actions$: Actions,
              protected datePickerService: DatePickerService) {
  }

  @Effect() blocksAvailable: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const datePickerBoxBlocks = blocks.filter((block: Block) => {
        return block.type === B2BlockType.DatePicker;
      });
      return new AddBlocks({blocks: datePickerBoxBlocks});
    });

  @Effect() clearBlocks: Observable<Action> = this.actions$
    .ofType(ListActionTypes.CLEAR_BLOCKS)
    .map(() => {
      return new ClearBlocks();
    });

  @Effect() valueDidChange$: Observable<Action> = this.actions$
    .ofType(DatePickerActionTypes.UPDATE_BLOCK)
    .map((action: UpdateBlock) => action.payload)
    .switchMap((payload) => {
      if (payload.notify) {
        this.datePickerService.blockDidChange(payload.block);
      }
      return empty();
    });
}
