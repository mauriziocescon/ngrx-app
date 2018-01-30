import { Injectable } from "@angular/core";

import {
  Block,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../dynamic-form/dynamic-form.module";

import { B1BlockUtilsService } from "../../b1";

import { B2BlockUtilsService } from "../../b2";

@Injectable()
export class CustomBlockUtilsService extends BlockUtilsService {

  constructor(protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService,
              protected b1BlockUtilsService: B1BlockUtilsService,
              protected b2BlockUtilsService: B2BlockUtilsService) {
    super(
      checkBoxService,
      dropdownService,
      textInputService,
    );
  }

  getComponentForBlock(block: Block): any {
    return this.b1BlockUtilsService.getComponentForBlock(block) |
      this.b2BlockUtilsService.getComponentForBlock(block) |
      super.getComponentForBlock(block);
  }

  triggerComponentDidLoad(block: Block): boolean {
    return this.b1BlockUtilsService.triggerComponentDidLoad(block) ||
      this.b2BlockUtilsService.triggerComponentDidLoad(block) ||
      super.triggerComponentDidLoad(block);
  }
}
