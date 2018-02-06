import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooksService,
  CheckBoxService,
  DropdownService,
  TextInputService,
} from "../../dynamic-blocks-list/dynamic-blocks-list.module";

import { B1BlockHooksService, B1BlocksMethods, B1BlocksHooks } from "../../b1";

import { B2BlockHooksService, B2BlocksMethods, B2BlocksHooks } from "../../b2";

import {
  CustomBlocksHooks,
  CustomBlocksMethods,
  Modules,
} from "../models";

@Injectable()
export class CustomBlockHooksService extends BlockHooksService {
  protected hooks: CustomBlocksHooks;

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

  setupHooks(hooks: CustomBlocksHooks, module?: string, step?: string): void {
    this.unsubscribeListeners();

    super.setupHooks(hooks, module, step);

    if (module === Modules.b1) {
      this.b1BlockHooksService.setupB1Hooks(hooks as B1BlocksHooks, module, step);
    } else if (module === Modules.b2) {
      this.b2BlockHooksService.setupB2Hooks(hooks as B2BlocksHooks, module, step);
    }
  }

  protected unsubscribeListeners(): void {
    super.unsubscribeListeners();

    this.b1BlockHooksService.unsubscribeListeners();
    this.b2BlockHooksService.unsubscribeListeners();
  }

  blocksMethods(module?: string): CustomBlocksMethods {
    let methods;

    if (module === Modules.b1) {
      methods = super.blocksMethods() as B1BlocksMethods;
      methods.checkBoxConfirmer = this.b1BlockHooksService.blocksMethods().checkBoxConfirmer;
    } else if (module === Modules.b2) {
      methods = super.blocksMethods() as B2BlocksMethods;
      methods.datePicker = this.b2BlockHooksService.blocksMethods().datePicker;
    } else {
      methods = super.blocksMethods();
    }

    return methods;
  }
}
