import { Injectable } from "@angular/core";

import {
  BlocksActionsService,
  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
} from "../../../instance-detail/instance-detail.module";

import { B1BlocksMethods } from "../../models";

import { CheckBoxConfirmerActionsService } from "./check-box-confirmer-actions.service";

@Injectable()
export class B1BlocksActionsService extends BlocksActionsService {

  constructor(protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService,
              protected checkBoxConfirmerActionsService: CheckBoxConfirmerActionsService) {
    super(
      checkBoxService,
      dropdownService,
      textInputService,
    );
  }

  getActions(): B1BlocksMethods {
    const actions = super.getActions() as B1BlocksMethods;
    actions.checkBoxConfirmer = this.checkBoxConfirmerActionsService.getCheckBoxConfirmerActions();
    return actions;
  }
}
