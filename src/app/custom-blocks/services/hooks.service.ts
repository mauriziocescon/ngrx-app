import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooksService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../dynamic-form/dynamic-form.module";

import { B1BlockHooksService } from "../../b1";

import { B2BlockHooksService } from "../../b2";

import {
  CustomBlocksHooks,
  CustomBlocksMethods,
} from "../models";

@Injectable()
export class CustomBlockHooksService extends BlockHooksService {
  hooks: CustomBlocksHooks;

  constructor(protected logger: NGXLogger,
              protected checkBoxService: CheckBoxService,
              protected dropdownService: DropdownService,
              protected textInputService: TextInputService,
              protected b1BlockHooksService: B1BlockHooksService,
              protected b2BlockHooksService: B2BlockHooksService) {
    super(
      logger,
      checkBoxService,
      dropdownService,
      textInputService,
    );
    this.startListenerForCustomBlocks();
  }

  startListenerForCustomBlocks(): void {
    this.b1BlockHooksService.startListenerForB1Blocks();
    this.b2BlockHooksService.startListenerForB2Blocks();
  }

  protected blocksMethods(): CustomBlocksMethods {
    return {
      ...super.blocksMethods(),
      ...this.b1BlockHooksService.blocksMethods(),
      ...this.b2BlockHooksService.blocksMethods(),
    };
  }
}
