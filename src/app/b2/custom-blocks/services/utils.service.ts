import { Injectable } from "@angular/core";

import { Block } from "../../../dynamic-form/dynamic-form.module";

import { DatePickerContainerComponent } from "../containers";

import { B2BlockType, DatePickerBlock } from "../models";

import { DatePickerService } from "./blocks/date-picker.service";

@Injectable()
export class B2BlockUtilsService {

  constructor(protected datePickerService: DatePickerService) {
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
