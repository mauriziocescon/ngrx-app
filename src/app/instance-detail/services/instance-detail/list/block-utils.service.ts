import { Injectable } from '@angular/core';

import { AppConstantsService } from '../../../../core/core.module';

import { CheckBoxContainerComponent } from '../../../containers/instance-detail/tabs/list/generic-block/blocks/check-box/check-box.container';
import { DropdownContainerComponent } from '../../../containers/instance-detail/tabs/list/generic-block/blocks/dropdown/dropdown.container';
import { TextInputContainerComponent } from '../../../containers/instance-detail/tabs/list/generic-block/blocks/text-input/text-input.container';
import { UnknownComponent } from '../../../components';

import {
  Block,
  BlockType,
} from '../../../models';

import { IBlockUtils } from '../../../tokens';

@Injectable()
export class BlockUtilsService implements IBlockUtils {
  module: string;

  constructor(protected appConstants: AppConstantsService) {
    this.module = this.appConstants.Application.INSTANCE_DETAIL_MODULE;
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case BlockType.CheckBox: {
        return CheckBoxContainerComponent;
      }
      case BlockType.Dropdown: {
        return DropdownContainerComponent;
      }
      case BlockType.TextInput: {
        return TextInputContainerComponent;
      }
      default: {
        return UnknownComponent;
      }
    }
  }
}
