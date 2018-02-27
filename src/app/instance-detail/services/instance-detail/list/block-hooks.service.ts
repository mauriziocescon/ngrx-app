import { Injectable } from "@angular/core";

import { BlockHooks } from "../../../models";

import { IBlockHooks } from "../../../tokens";

import { TextInputHooksTriggerService } from "./blocks/text-input-hooks-trigger.service";
import { CheckBoxHooksTriggerService } from "./blocks/check-box-hooks-trigger.service";
import { DropdownHooksTriggerService } from "./blocks/dropdown-hooks-trigger.service";

@Injectable()
export class BlockHooksService implements IBlockHooks {
  key: string;

  constructor(protected checkBoxHooksTrigger: CheckBoxHooksTriggerService,
              protected dropdownHooksTrigger: DropdownHooksTriggerService,
              protected textInputHooksTrigger: TextInputHooksTriggerService) {
    this.key = "base";
  }

  subscribeAll(hooks: BlockHooks): void {
    this.checkBoxHooksTrigger.subscribeAll(hooks);
    this.dropdownHooksTrigger.subscribeAll(hooks);
    this.textInputHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.checkBoxHooksTrigger.unsubscribeAll();
    this.dropdownHooksTrigger.unsubscribeAll();
    this.textInputHooksTrigger.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    return {};
  }
}
