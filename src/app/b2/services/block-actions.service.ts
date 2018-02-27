import { Injectable } from "@angular/core";

import { IBlockActions } from "../../instance-detail/instance-detail.module";

import { DatePickerActionsService } from "./blocks/date-picker-actions.service";

@Injectable()
export class B2BlocksActionsService implements IBlockActions {
  key: string;

  constructor(protected datePickerActionsService: DatePickerActionsService) {
    this.key = "b2";
  }

  getActions(): any {
    return {
      datePicker: {
        ...this.datePickerActionsService.getDatePickerActions(),
      },
    };
  }
}
