import { Injectable } from '@angular/core';

import { Block, IBlockUtils } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { CheckBoxConfirmerContainerComponent } from '../containers';

import { B1BlockType, CheckBoxConfirmerBlock } from '../models';

import { B1CheckBoxConfirmerHooksTriggerService } from './blocks/check-box-confirmer/check-box-confirmer-hooks-trigger.service';

@Injectable()
export class B1BlockUtilsService implements IBlockUtils {
  module: string;

  constructor(protected checkBoxConfirmerHooksTrigger: B1CheckBoxConfirmerHooksTriggerService) {
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

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case B1BlockType.CheckBoxConfirmer: {
        const checkBoxConfirmerBlock = block as CheckBoxConfirmerBlock;
        this.checkBoxConfirmerHooksTrigger.blockDidload(checkBoxConfirmerBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }
}
