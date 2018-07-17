import { Injectable } from '@angular/core';

import { Block, IBlockUtils } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { DatePickerContainerComponent } from '../containers';

import { B2BlockType } from '../models';

@Injectable()
export class B2BlockUtilsService implements IBlockUtils {
  module: string;

  constructor() {
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
}
