import { Injectable } from "@angular/core";

import { Block } from "../../../dynamic-form/dynamic-form.module";

import { CheckBoxConfirmerContainerComponent } from "../containers";

import { B1BlockType, CheckBoxConfirmerBlock } from "../models";

import { CheckBoxConfirmerService } from "./blocks/check-box-confirmer.service";

@Injectable()
export class B1BlockUtilsService {

  constructor(protected checkBoxConfirmerService: CheckBoxConfirmerService) {
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case B1BlockType.CheckBoxConfirmer: {
        return CheckBoxConfirmerContainerComponent;
      }
      default: {
        return undefined;
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
        return false;
      }
    }
  }
}
