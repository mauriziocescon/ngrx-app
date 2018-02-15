import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import { CheckBoxContainerComponent } from "../../containers/instance-detail/list/generic-block/blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "../../containers/instance-detail/list/generic-block/blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "../../containers/instance-detail/list/generic-block/blocks/text-input/text-input.container";
import { UnknownComponent } from "../../components";

import {
  Block,
  BlockType,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../models";

import * as fromInstanceDetail from "../../reducers";

import { TextInputService } from "./blocks/text-input.service";
import { DropdownService } from "./blocks/dropdown.service";
import { CheckBoxService } from "./blocks/check-box.service";

@Injectable()
export class BlockUtilsService {

  constructor(protected store$: Store<fromInstanceDetail.State>,
              protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService) {
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

  getSetOfRules(module: string, name: string): any {
    return {};
  }

  getAllEditedBlocksSelector(module: string, instance: string, step: string): Observable<Block[]> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksState);
  }

  getValiditySelector(module: string, instance: string, step: string): Observable<boolean> {
    return this.store$.select(fromInstanceDetail.getAllEditedBlocksValidityState);
  }
}
