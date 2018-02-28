import { Injectable } from "@angular/core";

import { IBlockActions } from "../../instance-detail/instance-detail.module";

import { module } from "../constants";

import { B2DatePickerActionsService } from "./blocks/date-picker-actions.service";

@Injectable()
export class B2BlockActionsService implements IBlockActions {
  module: string;

  constructor(protected datePickerActions: B2DatePickerActionsService) {
    this.module = module;
  }

  getActions(): any {
    return {
      datePicker: {
        ...this.datePickerActions.getDatePickerActions(),
      },
    };
  }
}
