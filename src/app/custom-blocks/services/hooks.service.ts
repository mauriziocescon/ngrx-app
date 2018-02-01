import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooksService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../dynamic-form/dynamic-form.module";

import { B1BlockHooksService, B1BlocksMethods } from "../../b1";

import { B2BlockHooksService,B2BlocksMethods } from "../../b2";

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
  }

  startListener(ecco?: boolean): void {
    super.startListener();

    if (!ecco) {
      this.b1BlockHooksService.startListenerForB1Blocks();
    } else {
      this.b2BlockHooksService.startListenerForB2Blocks();
    }
  }

  blocksMethods(ecco?: boolean): CustomBlocksMethods {
    let methods;

    if (!ecco) {
      methods = super.blocksMethods() as B1BlocksMethods;
      methods.checkBoxConfirmer = this.b1BlockHooksService.blocksMethods().checkBoxConfirmer;
    } else {
      methods = super.blocksMethods() as B2BlocksMethods;
      methods.datePicker = this.b2BlockHooksService.blocksMethods().datePicker;
    }
    return methods;
  }
}
