import { Injectable } from "@angular/core";

import { IBlockActions } from "../../instance-detail/instance-detail.module";

import { B1CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

@Injectable()
export class B1BlockActionsService implements IBlockActions {
  key: string;

  constructor(protected checkBoxConfirmerActions: B1CheckBoxConfirmerActionsService) {
    this.key = "b1";
  }

  getActions(): any {
    return {
      checkBoxConfirmer: {
        ...this.checkBoxConfirmerActions.getCheckBoxConfirmerActions(),
      },
    };
  }
}
