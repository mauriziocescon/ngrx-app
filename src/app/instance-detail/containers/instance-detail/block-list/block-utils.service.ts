import { Injectable } from '@angular/core';

import {
  Block,
  BlockType,
  IBlockUtils,
} from '../../../../shared/shared.module';

import {
  UnknownComponent,
} from '../../../components';

import { CheckBoxContainerComponent } from './blocks/check-box/check-box.container';
import { CheckBoxConfirmerContainerComponent } from './blocks/check-box-confirmer/check-box-confirmer.container';
import { DatePickerContainerComponent } from './blocks/date-picker/date-picker.container';
import { DropdownContainerComponent } from './blocks/dropdown/dropdown.container';
import { TextInputContainerComponent } from './blocks/text-input/text-input.container';

@Injectable()
export class BlockUtilsService implements IBlockUtils {

  constructor() {
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case BlockType.CheckBox: {
        return CheckBoxContainerComponent;
      }
      case BlockType.CheckBoxConfirmer: {
        return CheckBoxConfirmerContainerComponent;
      }
      case BlockType.DatePicker: {
        return DatePickerContainerComponent;
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
