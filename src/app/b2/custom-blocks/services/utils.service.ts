import { Injectable } from "@angular/core";

import { Block } from "../../../dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerContainerComponent } from "../containers";

import { B2BlockType, CheckBoxConfirmerBlock } from "../models";

import { CheckBoxConfirmerService } from "./blocks/date-picker.service";

@Injectable()
export class B2BlockUtilsService {

  constructor(protected checkBoxConfirmerService: CheckBoxConfirmerService) {
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case B2BlockType.CheckBoxConfirmer: {
        return CheckBoxConfirmerContainerComponent;
      }
      default: {
        return undefined;
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case B2BlockType.CheckBoxConfirmer: {
        const checkBoxConfirmerBlock = block as CheckBoxConfirmerBlock;
        this.checkBoxConfirmerService.blockDidload(checkBoxConfirmerBlock);
        return true;
      }
      default: {
        return undefined;
      }
    }
  }
}
