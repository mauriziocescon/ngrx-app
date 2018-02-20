import { Injectable } from "@angular/core";

import { BlocksMethods } from "../../../models/index";

import { CheckBoxActionsService } from "./check-box-actions.service";
import { DropdownActionsService } from "./dropdown-actions.service";
import { TextInputActionsService } from "./text-input-actions.service";

@Injectable()
export class BlocksActionsService {

  constructor(protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService) {
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
