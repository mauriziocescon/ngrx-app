import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import {
  CheckBoxContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent
} from "../../../containers";
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
              protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService) {
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
        this.checkBoxService.blockDidload(checkBoxBlock);
        return true;
      }
      case BlockType.Dropdown: {
        const dropdownBlock = block as DropdownBlock;
        this.dropdownService.blockDidload(dropdownBlock);
        return true;
      }
      case BlockType.TextInput: {
        const textInputBlock = block as TextInputBlock;
        this.textInputService.blockDidload(textInputBlock);
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
