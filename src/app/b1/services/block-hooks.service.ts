import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import { B1BlockHooks } from "../models";

import * as setOfRules from "../rules";

import { B1CheckBoxConfirmerHooksTriggerService } from "./blocks/check-box-confirmer-hooks-trigger.service";

@Injectable()
export class B1BlockHooksService implements IBlockHooks {
  key: string;

  constructor(protected checkBoxConfirmerHooksTrigger: B1CheckBoxConfirmerHooksTriggerService) {
    this.key = "b1";
  }

  subscribeAll(hooks: B1BlockHooks): void {
    this.checkBoxConfirmerHooksTrigger.subscribeAll(hooks);
  }

  unsubscribeAll(): void {
    this.checkBoxConfirmerHooksTrigger.unsubscribeAll();
  }

  getSetOfHooks(config: string): any {
    return setOfRules[config] ? setOfRules[config] : {};
  }
}
