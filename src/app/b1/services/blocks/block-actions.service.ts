import { Injectable } from "@angular/core";

import { IBlockActions } from "../../../instance-detail/instance-detail.module";

import { CheckBoxConfirmerActionsService } from "./check-box-confirmer-actions.service";

@Injectable()
export class B1BlocksActionsService implements IBlockActions {
  key: string;

  constructor(protected checkBoxConfirmerActionsService: CheckBoxConfirmerActionsService) {
    this.key = "b1";
  }

  getActions(): any {
    return {
      checkBoxConfirmer: {
        ...this.checkBoxConfirmerActionsService.getCheckBoxConfirmerActions(),
      },
    };
  }
}
