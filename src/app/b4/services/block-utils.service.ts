import { Injectable } from '@angular/core';

import { Block, IBlockUtils } from '../../instance-detail/instance-detail.module';

import { module } from '../constants';

import { DossierContainerComponent } from '../containers';

import { B4BlockType, DossierBlock } from '../models';

import { B4DossierHooksTriggerService } from './blocks/dossier/dossier-hooks-trigger.service';

@Injectable()
export class B4BlockUtilsService implements IBlockUtils {
  module: string;

  constructor(protected dossierHooksTrigger: B4DossierHooksTriggerService) {
    this.module = module;
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case B4BlockType.Dossier: {
        return DossierContainerComponent;
      }
      default: {
        return undefined;
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case B4BlockType.Dossier: {
        const dossierBlock = block as DossierBlock;
        this.dossierHooksTrigger.blockDidload(dossierBlock);
        return true;
      }
      default: {
        return false;
      }
    }
  }
}
