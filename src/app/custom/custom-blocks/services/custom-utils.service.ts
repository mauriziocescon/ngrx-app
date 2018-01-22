import { Injectable } from "@angular/core";

import {
  BlockUtilsService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../../base/dynamic-form/services";

import { TextInputConfirmerService } from "./blocks/text-input-confirmer.service";

import { Block } from "../../../base/dynamic-form/dynamic-form.module";
import { CustomBlockType, TextInputConfirmerBlock } from "../models";

import { TextInputConfirmerContainerComponent } from "../containers/blocks/text-input-confirmer/text-input-confirmer.container";

@Injectable()
export class CustomBlockUtilsService extends BlockUtilsService {

  constructor(protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService,
              protected textInputConfirmerService: TextInputConfirmerService) {
    super(
      checkBoxService,
      dropdownService,
      textInputService,
    );
  }

  getComponentForBlock(block: Block): any {
    switch (block.type) {
      case CustomBlockType.TextInputConfirmer: {
        return TextInputConfirmerContainerComponent;
      }
      default: {
        return super.getComponentForBlock(block);
      }
    }
  }

  triggerComponentDidLoad(block: Block): boolean {
    switch (block.type) {
      case CustomBlockType.TextInputConfirmer: {
        const textInputConfirmerBlock = block as TextInputConfirmerBlock;
        this.textInputConfirmerService.blockDidload(textInputConfirmerBlock);
        return true;
      }
      default: {
        super.getComponentForBlock(block);
      }
    }
  }
}
