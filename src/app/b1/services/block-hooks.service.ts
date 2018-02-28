import { Injectable } from "@angular/core";

import { IBlockHooks } from "../../instance-detail/instance-detail.module";

import { module } from "../constants";

import { B1BlockHooks } from "../models";

import * as setOfRules from "../rules";

import { B1CheckBoxConfirmerHooksTriggerService } from "./blocks/check-box-confirmer-hooks-trigger.service";

@Injectable()
export class B1BlockHooksService implements IBlockHooks {
  module: string;

  constructor(protected checkBoxConfirmerHooksTrigger: B1CheckBoxConfirmerHooksTriggerService) {
    this.module = module;
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
