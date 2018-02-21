import { Injectable } from "@angular/core";

import { BlocksMethods } from "../../../../models";

import { IBlockActions } from "../../../../tokens";

import { CheckBoxActionsService } from "./check-box-actions.service";
import { DropdownActionsService } from "./dropdown-actions.service";
import { TextInputActionsService } from "./text-input-actions.service";

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
