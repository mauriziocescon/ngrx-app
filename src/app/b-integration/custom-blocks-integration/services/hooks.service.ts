import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import {
  BlockHooksService,
  CheckBoxActionsService,
  DropdownActionsService,
  TextInputActionsService,
} from "../../../instance-detail/instance-detail.module";

import { B1BlockHooksService, B1BlocksMethods, B1BlocksHooks } from "../../../b1";
import { B2BlockHooksService, B2BlocksMethods, B2BlocksHooks } from "../../../b2";

import {
  CustomBlocksHooks,
  CustomBlocksMethods,
  Modules,
} from "../models";

import * as setOfRules from "../../custom-rules-integration";

@Injectable()
export class CustomBlockHooksService extends BlockHooksService {

  constructor(protected logger: NGXLogger,
              protected checkBoxService: CheckBoxActionsService,
              protected dropdownService: DropdownActionsService,
              protected textInputService: TextInputActionsService,
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
    this.unsubscribeAll();

    super.setupHooks(hooks, module, step);

    if (module === Modules.b1) {
      this.b1BlockHooksService.setupB1Hooks(hooks as B1BlocksHooks, module, step);
    } else if (module === Modules.b2) {
      this.b2BlockHooksService.setupB2Hooks(hooks as B2BlocksHooks, module, step);
    }
  }

  protected unsubscribeAll(): void {
    super.unsubscribeAll();

    this.b1BlockHooksService.unsubscribeAll();
    this.b2BlockHooksService.unsubscribeAll();
  }

  getSetOfRules(module: string, name: string): any {
    return setOfRules[module][name] ? setOfRules[module][name] : {};
  }

  getActions(): CustomBlocksMethods {
    let methods;

    if (this.module === Modules.b1) {
      methods = super.getActions() as B1BlocksMethods;
      methods.checkBoxConfirmer = this.b1BlockHooksService.getActions().checkBoxConfirmer;
    } else if (this.module === Modules.b2) {
      methods = super.getActions() as B2BlocksMethods;
      methods.datePicker = this.b2BlockHooksService.getActions().datePicker;
    } else {
      methods = super.getActions();
    }

    return methods;
  }
}
