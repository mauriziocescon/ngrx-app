import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { Block, IBlockUtils } from "../../instance-detail/instance-detail.module";

import { CheckBoxConfirmerContainerComponent } from "../containers";

import { B1BlockType, CheckBoxConfirmerBlock } from "../models";

import * as fromB1 from "../reducers";

import { B1CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

@Injectable()
export class B1BlockUtilsService implements IBlockUtils {
  key: string;

  constructor(protected store$: Store<fromB1.State>,
              protected checkBoxConfirmerActions: B1CheckBoxConfirmerActionsService) {
    this.key = "b1";
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case B1BlockType.CheckBoxConfirmer: {
        return CheckBoxConfirmerContainerComponent;
      }
      default: {
        return undefined;
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case B1BlockType.CheckBoxConfirmer: {
        const checkBoxConfirmerBlock = block as CheckBoxConfirmerBlock;
        this.checkBoxConfirmerActions.blockDidload(checkBoxConfirmerBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromB1.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromB1.getAllEditedBlocksValidityState);
  }
}
