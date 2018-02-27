import { Injectable } from "@angular/core";

import { NGXLogger } from "ngx-logger";

import { BlocksHooks } from "../../../models/index";

import { CheckBoxHooksTriggerService } from "./blocks/check-box-hooks-trigger.service";
import { DropdownHooksTriggerService } from "./blocks/dropdown-hooks-trigger.service";
import { TextInputHooksTriggerService } from "./blocks/text-input-hooks-trigger.service";

@Injectable()
export class BlockHooksTriggerService {

  constructor(protected logger: NGXLogger,
              protected checkBoxHooksTrigger: CheckBoxHooksTriggerService,
              protected dropdownHooksTrigger: DropdownHooksTriggerService,
              protected textInputHooksTrigger: TextInputHooksTriggerService) {
  }

  subscribeAll(hooks: BlocksHooks): void {
    this.checkBoxHooksTrigger.subscribeAll(hooks);
    this.dropdownHooksTrigger.subscribeAll(hooks);
    this.textInputHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.checkBoxHooksTrigger.unsubscribeAll();
    this.dropdownHooksTrigger.unsubscribeAll();
    this.textInputHooksTrigger.unsubscribeAll();
  }
}
