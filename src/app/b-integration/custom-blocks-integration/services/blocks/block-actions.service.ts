import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import {
  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
  BlocksActionsService,
} from "../../../../instance-detail/instance-detail.module";

import { B1BlocksActionsService } from "../../../../b1";

import { B2BlocksActionsService } from "../../../../b2";
import { Modules } from "../../models";

@Injectable()
export class CustomBlocksActionsService extends BlocksActionsService {

  constructor(protected route: ActivatedRoute,
              protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService,
              protected b1BlocksActionsService: B1BlocksActionsService,
              protected b2BlocksActionsService: B2BlocksActionsService) {
    super(
      checkBoxService,
      dropdownService,
      textInputService,
    );
  }

  getActions(): any {
    const module = this.route.snapshot.paramMap.get("module");

    if (module === Modules.b1) {
      return this.b1BlocksActionsService.getActions();
    } else if (module === Modules.b2) {
      return this.b2BlocksActionsService.getActions();
    }

    return super.getActions();
  }
}
