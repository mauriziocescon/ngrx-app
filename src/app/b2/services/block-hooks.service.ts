import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import { B2BlockHooks } from "../models";

import * as setOfRules from "../rules";

import { B2DatePickerHooksTriggerService } from "./blocks/date-picker-hooks-trigger.service";

@Injectable()
export class B2BlockHooksService implements IBlockHooks {
  key: string;

  constructor(protected datePickerHooksTrigger: B2DatePickerHooksTriggerService) {
    this.key = "b2";
  }

  subscribeAll(hooks: B2BlockHooks): void {
    this.datePickerHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.datePickerHooksTrigger.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    return setOfRules[config] ? setOfRules[config] : {};
  }
}
