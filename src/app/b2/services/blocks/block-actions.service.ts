import { Injectable } from "@angular/core";

import {
  BlocksActionsService,
  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
} from "../../../instance-detail/instance-detail.module";

import { B2BlocksMethods } from "../../models";

import { DatePickerActionsService } from "./date-picker-actions.service";

@Injectable()
export class B2BlocksActionsService extends BlocksActionsService {

  constructor(protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService,
              protected datePickerActionsService: DatePickerActionsService) {
    super(
      checkBoxService,
      dropdownService,
      textInputService,
    );
  }

  getActions(): B2BlocksMethods {
    const actions = super.getActions() as B2BlocksMethods;
    actions.datePicker = this.datePickerActionsService.getDatePickerActions();
    return actions;
  }
}
