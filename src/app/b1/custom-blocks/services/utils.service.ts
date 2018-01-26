import { Injectable } from "@angular/core";

import {
  Block,
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerContainerComponent } from "../containers/blocks/check-box-confirmer/check-box-confirmer.container";

import { B1BlockType, CheckBoxConfirmerBlock } from "../models";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

@Injectable()
export class B1BlockUtilsService extends BlockUtilsService {

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
      case B1BlockType.CheckBoxConfirmer: {
        return CheckBoxConfirmerContainerComponent;
      }
      default: {
        return super.getComponentForBlock(block);
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case B1BlockType.CheckBoxConfirmer: {
        const checkBoxConfirmerBlock = block as CheckBoxConfirmerBlock;
        this.checkBoxConfirmerService.blockDidload(checkBoxConfirmerBlock);
        return true;
      }
      default: {
        super.triggerComponentDidLoad(block);
      }
    }
  }
}
