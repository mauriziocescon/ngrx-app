import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { Block, IBlockUtils } from "../../instance-detail/instance-detail.module";

import { DatePickerContainerComponent } from "../containers";

import { B2BlockType, DatePickerBlock } from "../models";

import * as fromB2 from "../reducers";

import { B2DatePickerActionsService } from "./blocks/date-picker-actions.service";

@Injectable()
export class B2BlockUtilsService implements IBlockUtils {
  key: string;

  constructor(protected store$: Store<fromB2.State>,
              protected datePickerActions: B2DatePickerActionsService) {
    this.key = "b2";
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case B2BlockType.DatePicker: {
        return DatePickerContainerComponent;
      }
      default: {
        return undefined;
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case B2BlockType.DatePicker: {
        const datePickerBlock = block as DatePickerBlock;
        this.datePickerActions.blockDidload(datePickerBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromB2.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromB2.getAllEditedBlocksValidityState);
  }
}
