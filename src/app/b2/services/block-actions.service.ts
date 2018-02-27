import { Injectable } from "@angular/core";

import { IBlockActions } from "../../instance-detail/instance-detail.module";

import { B2DatePickerActionsService } from "./blocks/date-picker-actions.service";

@Injectable()
export class B2BlockActionsService implements IBlockActions {
  key: string;

  constructor(protected datePickerActions: B2DatePickerActionsService) {
    this.key = "b2";
  }

  getActions(): any {
    return {
      datePicker: {
        ...this.datePickerActions.getDatePickerActions(),
      },
    };
  }
}
