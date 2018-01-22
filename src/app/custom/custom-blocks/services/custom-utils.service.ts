import { Injectable } from "@angular/core";

import {
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../../base/dynamic-form/services";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

import { Block } from "../../../base/dynamic-form/dynamic-form.module";
import { CustomBlockType, CheckBoxConfirmerBlock } from "../models";

import { CheckBoxConfirmerContainerComponent } from "../containers/blocks/check-box-confirmer/check-box-confirmer.container";

@Injectable()
export class CustomBlockUtilsService extends BlockUtilsService {

  constructor(protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService,
              protected checkBoxConfirmerService: CheckBoxConfirmerService) {
    super(
      checkBoxService,
      dropdownService,
      textInputService,
    );
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case CustomBlockType.CheckBoxConfirmer: {
        return CheckBoxConfirmerContainerComponent;
      }
      default: {
        return super.getComponentForBlock(block);
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case CustomBlockType.CheckBoxConfirmer: {
        const checkBoxConfirmerBlock = block as CheckBoxConfirmerBlock;
        this.checkBoxConfirmerService.blockDidload(checkBoxConfirmerBlock);
        return true;
      }
      default: {
        super.getComponentForBlock(block);
      }
    }
  }
}
