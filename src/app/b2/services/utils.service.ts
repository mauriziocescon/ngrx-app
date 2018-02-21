import { Injectable } from "@angular/core";

import { Block } from "../../instance-detail/instance-detail.module";

import { DatePickerContainerComponent } from "../containers";

import { B2BlockType, DatePickerBlock } from "../models";

import { DatePickerActionsService } from "./blocks/date-picker-actions.service";

@Injectable()
export class B2BlockUtilsService {

  constructor(protected datePickerService: DatePickerActionsService) {
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case B2BlockType.DatePicker: {
        return DatePickerContainerComponent;
      }
      default: {
        return undefined;
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case B2BlockType.DatePicker: {
        const datePickerBlock = block as DatePickerBlock;
        this.datePickerService.blockDidload(datePickerBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }
}
