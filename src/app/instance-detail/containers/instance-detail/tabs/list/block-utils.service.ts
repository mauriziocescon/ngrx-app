import { Injectable } from '@angular/core';

import {
  Block,
  BlockType,
  IBlockUtils,
} from '../../../../../shared/shared.module';
import {
  UnknownComponent,
  CheckBoxContainerComponent,
  CheckBoxConfirmerContainerComponent,
  DatePickerContainerComponent,
  DropdownContainerComponent,
  TextInputContainerComponent,
} from '../../../../../blocks/blocks.module';

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
