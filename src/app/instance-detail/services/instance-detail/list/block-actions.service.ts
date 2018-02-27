import { Injectable } from "@angular/core";

import { AppConstantsService } from "../../../../core/core.module";

import { BlockActions } from "../../../models";

import { IBlockActions } from "../../../tokens";

import { CheckBoxActionsService } from "./blocks/check-box-actions.service";
import { DropdownActionsService } from "./blocks/dropdown-actions.service";
import { TextInputActionsService } from "./blocks/text-input-actions.service";

@Injectable()
export class BlockActionsService implements IBlockActions {
  key: string;

  constructor(protected appConstants: AppConstantsService,
              protected checkBoxActions: CheckBoxActionsService,
              protected dropdownActions: DropdownActionsService,
              protected textInputActions: TextInputActionsService) {
    this.key = this.appConstants.Application.INSTANCE_DETAIL_KEY;
  }

  getActions(): BlockActions {
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
