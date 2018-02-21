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
} from "../../../instance-detail/instance-detail.module";

import { DatePickerActionTypes, AddBlocks, UpdateBlock, ClearBlocks } from "../../actions/blocks/date-picker.actions";

import { B2BlockType } from "../../models";
import { DatePickerActionsService } from "../../services";

@Injectable()
export class DatePickerEffects {

  constructor(protected actions$: Actions,
              protected datePickerService: DatePickerActionsService) {
  }

  @Effect() blocksAvailable$: Observable<Action> = this.actions$
    .ofType(ListActionTypes.FETCH_BLOCKS_COMPLETE)
    .map((action: FetchBlocksComplete) => action.payload)
    .map((blocks: Block[]) => {
      const datePickerBoxBlocks = blocks.filter((block: Block) => {
        return block.type === B2BlockType.DatePicker;
      });
      return new AddBlocks({blocks: datePickerBoxBlocks});
    });

  @Effect() clearBlocks$: Observable<Action> = this.actions$
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
      return [new SyncRequired(Date.now())];
    });
}
