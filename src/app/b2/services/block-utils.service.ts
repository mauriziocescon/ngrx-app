import { Injectable } from "@angular/core";

import { Block, IBlockUtils } from "../../instance-detail/instance-detail.module";

import { module } from "../constants";

import { DatePickerContainerComponent } from "../containers";

import { B2BlockType, DatePickerBlock } from "../models";

import { B2DatePickerActionsService } from "./blocks/date-picker/date-picker-actions.service";

@Injectable()
export class B2BlockUtilsService implements IBlockUtils {
  module: string;

  constructor(protected datePickerActions: B2DatePickerActionsService) {
    this.module = module;
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
        this.datePickerActions.blockDidload(datePickerBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }
}
