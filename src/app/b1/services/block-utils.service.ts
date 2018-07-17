import { Injectable } from '@angular/core';

import { Block, IBlockUtils } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { CheckBoxConfirmerContainerComponent } from '../containers';

import { B1BlockType } from '../models';

@Injectable()
export class B1BlockUtilsService implements IBlockUtils {
  module: string;

  constructor() {
    this.module = module;
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
}
