import { Injectable } from "@angular/core";

import { Block } from "../../../instance-detail/instance-detail.module";

import { CheckBoxConfirmerContainerComponent } from "../containers";

import { B1BlockType, CheckBoxConfirmerBlock } from "../models";

import { CheckBoxConfirmerActionsService } from "./blocks/check-box-confirmer-actions.service";

@Injectable()
export class B1BlockUtilsService {

  constructor(protected checkBoxConfirmerService: CheckBoxConfirmerActionsService) {
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
