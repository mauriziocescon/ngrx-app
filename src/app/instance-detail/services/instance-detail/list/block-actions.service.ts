import { Injectable } from "@angular/core";

import { BlocksMethods } from "../../../models/index";

import { IBlockActions } from "../../../tokens/index";

import { CheckBoxActionsService } from "./blocks/check-box-actions.service";
import { DropdownActionsService } from "./blocks/dropdown-actions.service";
import { TextInputActionsService } from "./blocks/text-input-actions.service";

@Injectable()
export class BlocksActionsService implements IBlockActions {
  key: string;

  constructor(protected checkBoxActions: CheckBoxActionsService,
              protected dropdownActions: DropdownActionsService,
              protected textInputActions: TextInputActionsService) {
    this.key = "base";
  }

  getActions(): BlocksMethods {
    return {
      checkBox: {
        ...this.checkBoxActions.getCheckBoxActions(),
      },
      dropdown: {
        ...this.dropdownActions.getDropdownActions(),
      },
      textInput: {
        ...this.textInputActions.getTextInputActions(),
      },
    };
  }
}
