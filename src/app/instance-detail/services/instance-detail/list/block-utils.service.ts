import { Injectable } from "@angular/core";

import { AppConstantsService } from "../../../../core/core.module";

import { CheckBoxContainerComponent } from "../../../containers/instance-detail/tabs/list/generic-block/blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "../../../containers/instance-detail/tabs/list/generic-block/blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "../../../containers/instance-detail/tabs/list/generic-block/blocks/text-input/text-input.container";
import { UnknownComponent } from "../../../components";

import {
  Block,
  BlockType,
  CheckBoxBlock,
  DropdownBlock,
  TextInputBlock,
} from "../../../models";

import { IBlockUtils } from "../../../tokens";

import { CheckBoxHooksTriggerService } from "./blocks/check-box/check-box-hooks-trigger.service";
import { DropdownHooksTriggerService } from "./blocks/dropdown/dropdown-hooks-trigger.service";
import { TextInputHooksTriggerService } from "./blocks/text-input/text-input-hooks-trigger.service";

@Injectable()
export class BlockUtilsService implements IBlockUtils {
  module: string;

  constructor(protected appConstants: AppConstantsService,
              protected checkBoxHooksTrigger: CheckBoxHooksTriggerService,
              protected dropdownHooksTrigger: DropdownHooksTriggerService,
              protected textInputHooksTrigger: TextInputHooksTriggerService) {
    this.module = this.appConstants.Application.INSTANCE_DETAIL_MODULE;
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
        this.checkBoxHooksTrigger.blockDidload(checkBoxBlock);
        return true;
      }
      case BlockType.Dropdown: {
        const dropdownBlock = block as DropdownBlock;
        this.dropdownHooksTrigger.blockDidload(dropdownBlock);
        return true;
      }
      case BlockType.TextInput: {
        const textInputBlock = block as TextInputBlock;
        this.textInputHooksTrigger.blockDidload(textInputBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }
}
