import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { CheckBoxContainerComponent } from "../../../containers/instance-detail/list/generic-block/blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "../../../containers/instance-detail/list/generic-block/blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "../../../containers/instance-detail/list/generic-block/blocks/text-input/text-input.container";
import { UnknownComponent } from "../../../components";

import {
  Block,
  BlockType,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../../models";

import * as fromInstanceDetail from "../../../reducers";

import { IBlockUtils } from "../../../tokens";

import { TextInputActionsService } from "./blocks/text-input-actions.service";
import { DropdownActionsService } from "./blocks/dropdown-actions.service";
import { CheckBoxActionsService } from "./blocks/check-box-actions.service";

@Injectable()
export class BlockUtilsService implements IBlockUtils {
  key: string;

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected checkBoxActions: CheckBoxActionsService,
              protected dropdownActions: DropdownActionsService,
              protected textInputActions: TextInputActionsService) {
    this.key = "base";
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case BlockType.CheckBox: {
        return CheckBoxContainerComponent;
      }
      case BlockType.Dropdown: {
        return DropdownContainerComponent;
      }
      case BlockType.TextInput: {
        return TextInputContainerComponent;
      }
      default: {
        return UnknownComponent;
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case BlockType.CheckBox: {
        const checkBoxBlock = block as CheckBoxBlock;
        this.checkBoxActions.blockDidload(checkBoxBlock);
        return true;
      }
      case BlockType.Dropdown: {
        const dropdownBlock = block as DropdownBlock;
        this.dropdownActions.blockDidload(dropdownBlock);
        return true;
      }
      case BlockType.TextInput: {
        const textInputBlock = block as TextInputBlock;
        this.textInputActions.blockDidload(textInputBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }

  getAllEditedBlocksSelector(): Observable<Block[]> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksState);
  }

  getValiditySelector(): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksValidityState);
  }
}
