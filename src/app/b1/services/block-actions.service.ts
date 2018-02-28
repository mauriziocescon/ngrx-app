import { Injectable } from "@angular/core";

import { IBlockActions } from "../../instance-detail/instance-detail.module";

import { module } from "../constants";

import { B1CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

@Injectable()
export class B1BlockActionsService implements IBlockActions {
  module: string;

  constructor(protected checkBoxConfirmerActions: B1CheckBoxConfirmerActionsService) {
    this.module = module;
  }

  getActions(): any {
    return {
      checkBoxConfirmer: {
        ...this.checkBoxConfirmerActions.getCheckBoxConfirmerActions(),
      },
    };
  }
}
