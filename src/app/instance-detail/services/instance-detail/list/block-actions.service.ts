import { Injectable } from "@angular/core";

import { BlocksMethods } from "../../../models/index";

import { IBlockActions } from "../../../tokens/index";

import { CheckBoxActionsService } from "./blocks/check-box-actions.service";
import { DropdownActionsService } from "./blocks/dropdown-actions.service";
import { TextInputActionsService } from "./blocks/text-input-actions.service";

@Injectable()
export class BlocksActionsService implements IBlockActions {
  key: string;

  constructor(protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService) {
    this.key = "base";
  }

  getActions(): BlocksMethods {
    return {
      checkBox: {
        ...this.checkBoxService.getCheckBoxActions(),
      },
      dropdown: {
        ...this.dropdownService.getDropdownActions(),
      },
      textInput: {
        ...this.textInputService.getTextInputActions(),
      },
    };
  }
}
